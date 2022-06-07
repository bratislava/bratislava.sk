import { getNumericLocalDate } from './local-date'

export interface GooutEvent {
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
  events: GooutEvent[]
}

export const fetchGooutEvents = async (): Promise<FetchGooutEventsResult> => {
  const params = [
    ['source', 'bratislava.sk'],
    ['locality', 'SK_BRATISLAVA'],
    ['limit', 6],
    ['page', 1],
    ['category[]', 'CONCERTS'],
    ['category[]', 'PLAY'],
    ['category[]', 'CLUBBING'],
    ['category[]', 'EXHIBITIONS'],
    ['category[]', 'GASTRONOMY'],
    ['category[]', 'FILM'],
    ['category[]', 'FESTIVALS'],
    ['category[]', 'OTHER_EVENTS'],
  ]

  const result = await fetch(
    `https://goout.net/services/feeder/v1/events?${params
      .filter((p) => !!p[1])
      .map((p) => p.join('='))
      .join('&')}`
  )

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      events: [],
    }
  }

  const eventArray = Object.entries(
    resultData.events as {
      name: string
      url: string
      id: string
      mainImage: { id: string; src: string }
    }[]
  ).map((e) => e[1])

  const scheduleArray = Object.entries(
    resultData.schedule as {
      eventId: string
      venueId: string
      start: string
      address: string
      city: string
    }[]
  ).map((e) => e[1])

  const venueArray = Object.entries(
    resultData.venues as {
      id: string
      address: string
      city: string
    }[]
  ).map((e) => e[1])

  const schedule = scheduleArray.map((ev) => ({
    eventId: ev.eventId,
    venueId: ev.venueId,
    start: ev.start,
    address: ev.address,
    city: ev.city,
  }))

  const venues = venueArray.map((ev) => ({
    venueId: ev.id,
    address: ev.address,
    city: ev.city,
  }))

  const topSixGooutEvents: GooutEvent[] = eventArray.map((ev) => {
    const eventSchedule = schedule.find((s) => s.eventId === ev.id)

    const fullDate = eventSchedule.start.split(' ')
    const date = getNumericLocalDate(new Date(fullDate[0]).toISOString())
    const time = fullDate[1].split(':').slice(0, 2).join(':')

    const eventVenue = venues.find((venue) => venue.venueId === eventSchedule.venueId)

    return {
      title: ev.name,
      id: ev.id,
      url: ev.url,
      mainImage: ev.mainImage,
      schedule: `${date} ${time}`,
      venue: eventVenue.address,
    }
  })

  return {
    events: topSixGooutEvents,
  }
}
