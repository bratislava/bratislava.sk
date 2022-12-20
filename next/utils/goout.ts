import { parseGooutScheduleResponse } from '@utils/parseGooutScheduleResponse'
import { isPresent } from '@utils/utils'

export interface GooutEventParsed {
  title: string
  id: string
  url: string
  mainImage: {
    id: string
    src: string
  }
  schedule: string
  venue: string
}

export interface FetchGooutEventsResult {
  events: GooutEventParsed[]
}

// https://goout.net/services/entities/docs/index.html?url=/services/entities/v3/api-docs#/Entities/getV1Schedules
export const fetchGooutEvents = async (): Promise<FetchGooutEventsResult> => {
  const params = [
    ['languages[]', 'sk'],
    ['include', 'events,venues,images'],
    ['sort', 'timestamp:asc'],
    ['limit', '9'],
    ['performerIds[]', '2503723'],
    ['performerIds[]', '2503725'],
  ]

  const commonQueryParamsJoined = params
    .filter((p) => !!p[1])
    .map((p) => p.join('='))
    .join('&')

  const fetchUrl = `https://goout.net/services/entities/v1/schedules?${commonQueryParamsJoined}`

  const result = await fetch(fetchUrl)
  const resultData = await result.json()

  /* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */
  if (resultData.error) {
    console.error(new Error(resultData.error.message))
    return { events: [] }
  }
  /* eslint-enable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */

  const { shortEvents, longEvents } = parseGooutScheduleResponse(resultData)

  const events = [...shortEvents, ...longEvents].filter(isPresent)

  return {
    events,
  }
}
