/* eslint-disable @typescript-eslint/no-explicit-any */
import { GooutEventParsed } from '@utils/goout'
import { getNumericLocalDate } from '@utils/local-date'

export const getEventDaysCount = (startDay: Date, endDay: Date) => {
  // One day Time in ms (milliseconds)
  const ONE_DAY = 1000 * 60 * 60 * 24
  // To calculate the time difference of two dates
  const differenceInTime = endDay.getTime() - startDay.getTime()
  // To calculate the number of days between two dates
  return differenceInTime / ONE_DAY
}

type GooutSchedule = {
  id: string
  startAt: string
  endAt: string
  eventId: string
  venueId: string
  siteUrl: string
}

type GooutEvent = {
  id: string
  title: string
  imageId: string
}

type GooutVenue = {
  id: string
  address: string
}

type GooutImage = {
  id: string
  src: string
}

export const parseSchedules = (
  schedules: GooutSchedule[],
  events: GooutEvent[],
  venues: GooutVenue[],
  images: GooutImage[],
): (GooutEventParsed | null)[] => {
  return schedules.map((schedule) => {
    const event = events.find((ev) => ev.id === schedule.eventId)
    const venue = venues.find((ven) => ven.id === schedule.venueId)
    const image = images.find((img) => img.id === event?.imageId)

    const startDate = getNumericLocalDate(new Date(schedule.startAt).toISOString()).slice(0, -4)
    const endDate = getNumericLocalDate(new Date(schedule.endAt).toISOString()).slice(0, -4)
    const startTime = schedule.startAt.slice(11, 16)

    const dateTimeString =
      endDate !== startDate ? `${startDate} - ${endDate}` : `${startDate} ${startTime}`

    if (!event || !image) {
      return null
    }

    return {
      title: event.title,
      id: event.id,
      url: schedule.siteUrl,
      mainImage: image,
      schedule: dateTimeString,
      venue: venue?.address ?? '',
    }
  })
}

export const parseGooutScheduleResponse = (resultData: any) => {
  const schedules = Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    resultData.schedules as {
      id: string
      attributes: {
        startAt: string
        endAt: string
      }
      relationships: {
        event: {
          id: string
        }
        venue: {
          id: string
        }
      }
      locales: {
        sk: {
          siteUrl: string
        }
      }
    }[],
  )
    .map((s) => s[1])
    .map(
      (schedule) =>
        ({
          id: schedule.id,
          startAt: schedule.attributes.startAt,
          endAt: schedule.attributes.endAt,
          eventId: schedule.relationships.event.id,
          venueId: schedule.relationships.venue.id,
          siteUrl: schedule.locales.sk.siteUrl,
        } as GooutSchedule),
    )

  const schedulesShort = schedules.filter((schedule) => {
    const startDay = new Date(schedule.startAt.slice(0, 10))
    const endDay = new Date(schedule.endAt.slice(0, 10))
    const daysCount = getEventDaysCount(startDay, endDay)
    return daysCount <= 5
  })

  const schedulesLong = schedules.filter((schedule) => {
    const startDay = new Date(schedule.startAt.slice(0, 10))
    const endDay = new Date(schedule.endAt.slice(0, 10))
    const daysCount = getEventDaysCount(startDay, endDay)
    return daysCount > 5
  })

  const events = Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    resultData.included.events as {
      id: string
      url: string
      locales: {
        sk: {
          name: string
        }
      }
      relationships: {
        images: {
          id: string
        }[]
      }
    }[],
  )
    .map((e) => e[1])
    .map(
      (event) =>
        ({
          id: event.id,
          title: event.locales.sk.name,
          imageId: event.relationships.images[0].id,
        } as GooutEvent),
    )

  const venues = Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    resultData.included.venues as {
      id: string
      attributes: {
        address: string
      }
      locales: {
        sk: {
          name: string
        }
      }
    }[],
  )
    .map((e) => e[1])
    .map(
      (venue) =>
        ({
          id: venue.id,
          address: venue.attributes.address,
        } as GooutVenue),
    )

  const images = Object.entries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    resultData.included.images as {
      id: string
      attributes: {
        url: string
      }
    }[],
  )
    .map((img) => img[1])
    .map(
      (img) =>
        ({
          id: img.id,
          src: img.attributes.url,
        } as GooutImage),
    )

  const shortEvents = parseSchedules(schedulesShort, events, venues, images)
  const longEvents = parseSchedules(schedulesLong, events, venues, images)

  return { shortEvents, longEvents }
}
