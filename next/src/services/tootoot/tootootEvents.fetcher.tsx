/* eslint-disable no-underscore-dangle */

import sortBy from 'lodash/sortBy'

import { cityOrganizationsTootootIds, cityTootootId } from '@/src/services/tootoot/constants'

// This constant is bigger than shown events because of filtering, may be adjusted if needed
const eventsCountToFetch = 24
const eventsCountToShow = 12

type TootootEventResponse = {
  ProfileName: string
  ProfilePicture: string
  ShareImage: string
  About: string
  Author: Profile
  Building: Profile
  EventGroupId: string
  Lineup: {
    ProfileRef: Profile
    Confirmed: boolean
    Dismissed: boolean
    Begin: string
    HideTime: boolean
    End: string
    Day: number
    _id: string
    Type: string
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Collaborators: any[]
  Categories: Venue[]
  Status: string
  RelatedEvents: Response[]
  LonLat: {
    Lon: number
    Lat: number
  }
  AddressContact: {
    AddressLine: string
    City: string
    Zip: string
    Country: string
    Private: boolean
    ContactType: string
    _id: string
    Type: string
  }
  SellingChannelInfo: {
    SellingChannel: string
    Url?: string
  }
  Begin: string
  End: string
  OpenGate: string
  BeginSelling: string
  EndSelling: string
  LastUpdated: string
  TimeZone: number
  TimeZoneLocation: null
  Currency: string
  TicketRegistration2: null
  AboutRichText: string
  StreamSettings: null
  IsTour: boolean
  WebUrl: null | string
  EventHasMomForCovidTest: boolean
  CovidMode: string
  IsClosed: boolean
  MovieInfo: null
  Keywords: string[]
  IsCanceled: boolean
  VenueRef: Venue
  PerformanceLabel: null
  MinPrice: number | null
  MaxPrice: number | null
  _id: string
  EntityType: string
}

type Profile = {
  ProfileName: string
  ProfilePicture: null | string
  IsOrganizer: boolean
  _id: string
  EntityType: string | null
  Confirmed?: boolean
}

type Venue = {
  Name: string
  _id: string
  EntityType: string
  HallGroupId?: null
}

export type TootootEvent = {
  id: string
  title: string
  url: string
  image: string
  address?: string
  /**
   * ISO 8601 date
   */
  beginDate: string
  /**
   * ISO 8601 date or null
   */
  endDate: string | null
  isLongTerm: boolean
}

export const getTootootEventsQueryKey = () => ['TootootEvents']

/**
 * Documentation: https://github.com/bratislava/bratislava.sk/files/11027013/Tootoot.Lippu.API.documentation.Profile.pdf
 */
const fetchTootootEventsByProfiles = async (profileIds: string[]) => {
  const result = await fetch(
    `https://api.tootoot.co/api/event/webForClubs?eventBegin=Future&page=0&perPage=${eventsCountToFetch}&profileId=${profileIds.join(
      ',',
    )}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.tootoot.v2.1+json',
      },
    },
  )

  return result.json() as Promise<TootootEventResponse[]>
}

/**
 * First, events from Bratislava profile are displayed, then events up to "eventsCountToShow" are filled from other profiles (displayed
 * also here: https://www.bkis.sk/podujatia/).
 */
export const getTootootEvents = async () => {
  const eventsBa = await fetchTootootEventsByProfiles([cityTootootId])
  const eventsOther = await fetchTootootEventsByProfiles(cityOrganizationsTootootIds)

  // Hint from Tootoot: sorting events by endDate helps to prevent longer events to take space in first places for too long
  return [...sortBy(eventsBa, ['End']), ...sortBy(eventsOther, ['End'])]
    .slice(0, eventsCountToShow)
    .map((event) => {
      // If the event is so called "long-term", it returns this:
      const isLongTerm = event.End === '9999-12-30T23:59:59Z'

      return {
        id: event._id,
        title: event.ProfileName,
        url: `https://tootoot.fm/sk/events/${event._id}`,
        image: `https://api.tootoot.co/api/event/${event._id}/images/${event.ShareImage}/768/600/AUTO`,
        // This seems to be the best thing to display as address,
        address: event.Building?.ProfileName,
        beginDate: event.Begin,
        endDate: isLongTerm ? null : event.End,
        isLongTerm,
      } as TootootEvent
    })
}
