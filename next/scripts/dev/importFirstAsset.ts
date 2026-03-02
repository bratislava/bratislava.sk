/* eslint-disable no-console */
/**
 * Imports the first file from CSV into Strapi using GraphQL
 *
 * Usage:
 * 1. Install dependencies: npm install filenamify
 * 2. Ensure NEXT_PUBLIC_STRAPI_URL is set in .env.local
 * 3. Run: npx ts-node scripts/dev/importFirstAsset.ts
 *
 */
import * as fs from 'node:fs'
import path from 'node:path'

import { slugifyWithCounter } from '@sindresorhus/slugify'
import axios from 'axios'
import dotenv from 'dotenv'
import filenamify from 'filenamify'
import { GraphQLClient } from 'graphql-request'

import { isDefined } from '@/src/utils/isDefined'

import { AssetInput, getSdk } from '../../src/services/graphql'

// Load envs
dotenv.config({ path: '.env.local' })

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const gql = new GraphQLClient(`${strapiBaseUrl}/graphql`)
export const client = getSdk(gql)

const slugify = slugifyWithCounter()

interface CsvRow {
  fileName: string
  format: string
  mimeType: string
  fileUrl: string
  dateOfCreation: string
  oldCategory: string
  clarifiedOldCategory: string
  newCategory: string
  id: string
  documentId: string
  description: string
  isFromAdditionalScraping: string
}

const parseCsvRow = (line: string): CsvRow | null => {
  // Simple CSV parser - handles quoted fields
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current) // Last field

  if (fields.length < 12) return null

  return {
    fileName: fields[0] || '',
    format: fields[1] || '',
    mimeType: fields[2] || '',
    fileUrl: fields[3] || '',
    dateOfCreation: fields[4] || '',
    oldCategory: fields[5] || '',
    clarifiedOldCategory: fields[6] || '',
    newCategory: fields[7] || '',
    id: fields[8] || '',
    documentId: fields[9] || '',
    description: fields[10] || '',
    isFromAdditionalScraping: fields[11] || '',
  }
}

const downloadFile = async (url: string): Promise<Buffer> => {
  // console.log(`Downloading file from: ${url}`)
  const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30_000 })

  return Buffer.from(response.data)
}

const uploadToStrapi = async (
  fileBuffer: Buffer,
  fileNameUnpurified: string,
  mimeType: string,
): Promise<number> => {
  // Note: Strapi uses their version of filenamify lib: https://github.com/strapi/strapi/blob/79a590a581fd8272fafe5644b39c108a3a192b67/packages/core/upload/server/src/services/upload.ts#L89
  // Note: We additionally replace all dots by underscores, otherwise strapi takes part after the last dot as file extension...
  // Other dots are replaced by underscores during the upload process anyway, so we can do it beforehand.
  const fileName = filenamify(fileNameUnpurified, { replacement: '_', maxLength: 255 }).replaceAll(
    '.',
    '_',
  )

  // console.log(`Uploading to Strapi: ${fileName}`)

  const fileBlob = new Blob([fileBuffer], { type: mimeType })

  const formData = new FormData()
  // Append file buffer with filename
  formData.append('files', fileBlob, fileName)

  // Optionally add fileInfo as JSON string (name, alternativeText, caption)
  const fileInfo = {
    name: fileName,
    // alternativeText: fileName,
  }
  formData.append('fileInfo', JSON.stringify(fileInfo))

  try {
    const response = await axios.post(`${strapiBaseUrl}/api/upload`, formData, {
      // headers,
      timeout: 60_000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })

    // Strapi returns an array of uploaded files
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Invalid response from Strapi upload endpoint')
    }

    const uploadedFile = response.data[0]
    if (!uploadedFile || !uploadedFile.id) {
      throw new Error('Uploaded file missing ID in response')
    }

    // console.log(`Uploaded file ID: ${uploadedFile.id}`)

    return uploadedFile.id
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Upload error response:', error.response?.data)
      console.error('Upload error status:', error.response?.status)
    }
    throw error
  }
}

const createIsoString = (dateString: string, hours: number) => {
  let date = new Date()
  // Sorry, I had date in different formats in different tables
  if (dateString.includes('.')) {
    const [day, month, year] = dateString.split('.').map(Number)
    date = new Date(year, month - 1, day, hours)
  }

  if (dateString.includes('-')) {
    const [year, month, day] = dateString.split('-').map(Number)
    date = new Date(year, month - 1, day, hours)
  }

  // console.log('createIsoString', dateString, date, date.toISOString())

  return date.toISOString()
}

const createAsset = async (row: CsvRow, fileId: number): Promise<void> => {
  // console.log(`Creating asset: ${row.fileName}`)

  const slug = slugify(`starz-${row.fileName}`)

  const publishedAt = createIsoString(row.dateOfCreation, 12)

  const assetData: AssetInput = {
    title: `STaRZ - ${row.fileName}`,
    slug,
    files: [fileId.toString()],
    description: row.description.replace(/\\n/g, '\n') || null, // Needed for proper newlines import
    assetCategory: row.documentId || null,
    adminGroups: ['jo5fdw77stuwdv5uwzcacr1z'],
    publishedAt, // it's ignored by Strapi :/
    customPublishedAt: publishedAt,
    customMetadata: row,
  }

  // console.log('Creating asset - assetData', assetData)

  const data = {
    ...assetData,
  }

  const result = await client.CreateAsset({
    data,
  })

  if (!result.createAsset) {
    console.log('Creating asset failed')
  }

  // console.log(`Created asset ${result.createAsset.documentId} ${slug}`)
  // console.log(
  //   `Document URL: ${strapiBaseUrl}/admin/content-manager/collection-types/api::document.document/${result.createAsset.documentId}`,
  // )
}

const updateAssetDescription = async (row: CsvRow): Promise<void> => {
  // console.log(`Updating asset: ${row.fileName}`)

  if (!row.description) {
    console.log('Skipping')

    return
  }

  const slug = slugify(`starz-${row.fileName}`, {
    decamelize: false,
    preserveTrailingDash: true,
  })

  const response = await client.AssetBySlug({ slug })
  const asset = response.assets[0]
  if (!asset) {
    throw new Error(`No asset ${slug}`)
  }

  const result = await client.UpdateAssetDescription({
    documentId: asset.documentId,
    description: row.description.replace(/\\n/g, '\n'), // Needed for proper newlines import
  })

  if (!result.updateAsset) {
    console.log('Updating asset failed')
  }

  // console.log(`Updating asset: ${result.updateAsset.description}`)
}

const main = async () => {
  const csvPath = path.join(process.cwd(), './scripts/dev/starz_files_export-2.csv')

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`)

    return
  }

  console.log(`Reading CSV: ${csvPath}`)
  const csvContent = fs.readFileSync(csvPath, 'utf8')
  const linesWithHeader = csvContent.split('\n').filter((line) => line.trim())

  if (linesWithHeader.length < 2) {
    console.error('CSV file must have at least a header and one data row')

    return
  }

  const lines = linesWithHeader.slice(1, linesWithHeader.length)

  const rowsUnfiltered = lines.map((line) => parseCsvRow(line))
  const rowsFiltered = rowsUnfiltered.filter(isDefined)

  if (rowsFiltered.length !== rowsUnfiltered.length) {
    console.warn(`Filtered out ${rowsUnfiltered.length - rowsFiltered.length} invalid rows`)
  } else {
    console.log('No broken rows found', rowsFiltered.length)
  }

  let rowsToParse = [...rowsFiltered]
  rowsToParse = rowsToParse.slice(0, rowsToParse.length)
  // rowsToParse = rowsToParse.filter(
  //   (row) =>
  //     row.fileName === 'Dodatok č. 3 zo dňa 22.1.2016 k zmluve o nájme č. 20/2009 zo dňa 7.5.2009',
  // )
  // rowsToParse = rowsToParse.slice(0, 2)

  console.log('rowsToParse:', rowsToParse.length)

  for (const [i, row] of rowsToParse.entries()) {
    // console.log(`\n\n=== Processing row ${i} ===`)
    // process.stdout.write(`${i + 1}...`)
    // process.stdout.clearLine(0)
    // process.stdout.cursorTo(0)

    // Note: updateAsset mutation changes also publishedAt and deletes draft or published version of the document in strapi db... So it's not safe to use now.
    // try {
    //   await updateAssetDescription(row)
    //
    //   console.log(`Row ${i} ✅ Success!`)
    // } catch (error) {
    //   console.error(`\nRow ${i} ❌ Error:`)
    //   console.log(`Row ${i}`, row)
    //   if (axios.isAxiosError(error)) {
    //     console.error('Response:', error.response?.data)
    //   } else {
    //     console.error('NonAxiosError:', error)
    //   }
    // }

    try {
      // Download file
      const fileBuffer = await downloadFile(row.fileUrl)

      // Upload to Strapi
      const fileId = await uploadToStrapi(fileBuffer, row.fileName, row.mimeType)

      // console.log(row, fileId)

      // Create asset
      await createAsset(row, fileId)

      console.log(`Row ${i} ✅ Success!`)
    } catch (error) {
      console.error(`\nRow ${i} ❌ Error:`)
      console.log(`Row ${i}`, row)
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data)
      } else {
        console.error('NonAxiosError:', error)
      }
    }
  }
}

const deleteAllStarzAssets = async () => {
  const result = await client.Assets({
    filters: {
      createdAt: {
        gte: '2026-02-27T00:00:00.000Z',
        lt: '2026-02-28T00:00:00.000Z',
      },
      slug: {
        startsWith: 'starz',
      },
    },
  })
  const starzAssets = result.assets.filter(isDefined).filter(
    (asset) =>
      ![
        'starz-zverovacie-protokoly',
        'starz-zriadovacia-listina',
        // 'starz-zmluva-c-253-2018-e-o-poskytnuti-dotacie-na-podporu-rozvoja-sportu-na-rok-2018-z-financnych-prostriedkov-z-uradu-vlady-slovenskej-republiky-na-projekt-detsky-trampolinovy-park-subor-vonkajsich-trampolin-v-areali-zdravia-zlate-piesky',
        // 'starz-dodatok-c-4-248-2016-s-zo-dna-25-08-2016-k-zmluve-o-spolupraci-zo-dna-30-6-2015-poskytovanie-sportovych-a-rekreacnych-sluzieb-na-plavarni-pasienky-a-sh-harmincova-system-citaciek-kariet-pre-plavaren-pasienky',
        // 'starz-zmluva-o-medialnom-partnerstve-c-098-2016-m-zo-dna-7-3-2016-poskytnutie-reklamneho-priestoru-pre-starz-pri-kampani-zameranej-na-informovanie-sirokej-verejnosti-o-sportovom-podujati-narodny-beh-devin-bratislava',
        // 'starz-zmluva-o-dielo-1-predmetom-tejto-zmluvy-je-uskutocnovanie-prac-v-ramci-akcie-obsluzna-komunikacia-na-vodohospodarskej-stavbe-karloveske-rameno-objekt-uprava-nivelety-cyklotrasy-na-obsluznej-komunikacii-karloveske-rameno',
        // 'starz-zmluva-o-dielo-odstranenie-zavad-z-odbornej-prehliadky-plynoveho-zariadenia-podla-zak-124-06-bozp-vyhl-508-10-z-z-mpsvsr-59-82-subp-zmien-a-doplnkov-zo-dna-17-3-2015-v-plynovej-kotolni-objektu-ubytovna-flora-az-zlate-piesky',
      ].includes(asset.slug),
  )
  // .filter((asset) => asset.slug.startsWith('starz'))

  console.log(`To delete ${starzAssets.length} starz assets`)
  for (const asset of starzAssets) {
    // console.log('asset found:', asset.slug)
    const resultDelete = await client.DeleteAsset({ documentId: asset.documentId })
    console.log(`Deleted: ${resultDelete.deleteAsset?.documentId}`)
  }
}

main()

// deleteAllStarzAssets()
