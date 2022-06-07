interface IFetchOptions {
  type: string
  id?: string
  action?: string
}

type IResultFileType = 'json' | 'csv'

export interface FetchOpenDataResult {
  data: IJSONFile[] // TODO IJSONFile[] || ICSVFile[] ??
}

interface IDataset {
  id: string
  name: string
  slug: string
}

interface IDatasetFile {
  id: string
  name: string
  type: string
}

interface IJSONFile {
  name: string
  jsonData: JSONData
}

type JSONData = Record<string, any>

class OpenDataClient {
  private _apiKey?: string
  private _cache: { [key: string]: any }

  constructor(apiKey: string | undefined) {
    this._apiKey = apiKey
    this._cache = {}
  }

  getCyclingData = async (resultFileType: IResultFileType = 'json') => {
    const data = await this._getData({
      categorySlug: 'doprava',
      datasetSlug: 'cykloscitace-bratislava',
      resultFileType,
    })

    return data
  }

  private _getData = async ({
    categorySlug,
    datasetSlug,
    resultFileType,
  }: {
    categorySlug: string
    datasetSlug: string
    resultFileType: IResultFileType
  }) => {
    try {
      // Firstly fetch the id of the right category based on categorySlug
      const category = await this._fetchCategory(categorySlug)

      if (!category) throw new Error(`Category ${categorySlug} not found`)

      // Then fetch the id of the right dataset based on datasetSlug and categoryId
      const dataset = await this._fetchDataset(datasetSlug, category.id)

      if (!dataset) throw new Error(`Data set ${datasetSlug} not found`)

      // Then fetch all the files from this dataset
      const datasetFiles = await this._fetchDatasetFiles(dataset.id)

      if (datasetFiles.length === 0) throw new Error(`Data set with id ${dataset.id} has no files`)

      // Then download all JSON files from this dataset
      const resultData = await this._downloadAllFiles(datasetFiles, resultFileType)

      return {
        data: resultData,
      } as FetchOpenDataResult
    } catch (error) {
      throw new Error(`OpenDataClient error while getting data: ${error}`)
    }
  }

  private _getCacheKey = ({ type, id, action }: IFetchOptions) => `${type}@${id}@${action}`

  private _handleFetch = async <T>({ type, id, action }: IFetchOptions): Promise<T> => {
    if (!this._apiKey) {
      throw new Error('Invalid API Key')
    }

    const cacheKey = this._getCacheKey({ type, id, action })
    const cacheData = this._cache[cacheKey]
    if (cacheData) {
      return cacheData
    }

    const slugs = [type, id, action]
    const params = slugs.filter(Boolean).join('/')

    const url = `https://opendata.bratislava.sk/api/${params}`

    const res = await fetch(url, {
      headers: {
        key: this._apiKey,
      },
    })

    if (res.status >= 300) {
      throw new Error(
        `Problem with server communication [status:${res.status}] [params: type:${type} id:${id} action:${action}]`
      )
    }

    const data = await res.json()

    this._cache[cacheKey] = data

    return data
  }

  private _fetchCategory = async (slug: string) => {
    const data = await this._handleFetch<{ categories: IDataset[] }>({
      type: 'category',
    })

    const category = data.categories.find((category) => category.slug === slug)

    return category
  }

  private _fetchDataset = async (slug: string, categoryId: string) => {
    const data = await this._handleFetch<{ datasets: IDataset[] }>({
      type: 'category',
      id: categoryId,
      action: 'datasets',
    })

    const dataset = data.datasets.find((dataset) => dataset.slug === slug)

    return dataset
  }

  private _fetchDatasetFiles = async (datasetId: string) => {
    const data = await this._handleFetch<{ files: IDatasetFile[] }>({
      type: 'dataset',
      id: datasetId,
      action: 'files',
    })

    return data.files
  }

  private _downloadAllFiles = async (datasetFiles: IDatasetFile[], resultFileType: IResultFileType) => {
    const downloadedFiles: IJSONFile[] = []

    for (const file of datasetFiles) {
      if (file.type === resultFileType) {
        const data = await this._handleFetch<JSONData>({
          type: 'file',
          id: file.id,
          action: 'download',
        })

        downloadedFiles.push({ name: file.name, jsonData: data })
      }
    }

    return downloadedFiles
  }
}

const client = new OpenDataClient(process.env.OPEN_DATA_API_KEY)

export default client
