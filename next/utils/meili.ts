export interface SearchRequest {
  index: string
  keyword: string
}

export const search = async ({ index, keyword }: SearchRequest): Promise<any> => {
  const raw = JSON.stringify({
    q: keyword,
  })
  const result = await fetch(`${process.env.MEILI_URL}indexes/${index}/search`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.MEILI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: raw,
  })

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      value: [],
    }
  }

  return resultData
}

export const pagesFetcher = (keyword: string) => fetch(`/api/search`).then((r) => r.json())
