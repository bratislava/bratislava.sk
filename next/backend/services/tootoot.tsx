/* eslint-disable no-underscore-dangle */

const eventsCount = 12

interface TootootEventResponse {
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

interface Profile {
  ProfileName: string
  ProfilePicture: null | string
  IsOrganizer: boolean
  _id: string
  EntityType: string | null
  Confirmed?: boolean
}

interface Venue {
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
}

/**
 * Documentation: https://github.com/bratislava/bratislava.sk/files/11027013/Tootoot.Lippu.API.documentation.Profile.pdf
 */
const fetchTootootHomepageEvents = async (profileIds: string[]) => {
  const result = await fetch(
    `https://api.tootoot.co/api/event/webForClubs?eventBegin=Future&page=0&perPage=${eventsCount}&profileId=${profileIds.join(
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
 * First, events from Bratislava profile are displayed, then events up to "eventsCount" are filled from other profiles (displayed
 * also here: https://www.bkis.sk/podujatia/).
 */
export const getTootootHomepageEvents = async () => {
  const eventsBa = await fetchTootootHomepageEvents(['63dabb7abacf0a031cd19693']) //	Mesto Bratislava
  const eventsOther = await fetchTootootHomepageEvents([
    '63d14613826c200250f25391', //	BKIS
    '638f33a8b96254062cbbc0ac', //	Divadlo P. O. Hviezdoslava
    '63ceeb9a408a9511ecea8f5e', //	Galéria mesta Bratislava
    '63d040e7826c20047431c62d', //	Generálny investor Bratislavy: Titulka
    '63d042702cd37e0a00044e9e', //	Komunálny podnik Bratislavy
    '63d044442cd37e0a000548ae', //	MARIANUM - Pohrebníctvo mesta Bratislavy
    '63d066a22cd37e0a00108eff', //	MESTSKÁ KNIŽNICA V BRATISLAVE
    '63d0685a826c2004744ce753', //	Mestské lesy v Bratislave
    '63d068e2826c2004744d1e65', //	MESTSKÝ ÚSTAV OCHRANY PAMIATOK V BRATISLAVE
    '63d06a9b2cd37e0a0010b2d8', //	Metropolitný inštitút Bratislavy
    '63d06b912cd37e0a0010c10c', //	Múzeum mesta Bratislava
    '63d06c9d2cd37e0a0010cf9a', //	STaRZ - Správa telovýchovných a rekreačných zariadení hlavného mesta SR
    '63d06dc32cd37e0a0010d19c', //	Zoologická záhrada
    '63ee15be1ff4a0077c9e14ae', //	Bratislava Tourist Board
    '63ee18a5049c0b04802ae407', //	Archív mesta Bratislava
    '6407c1d1caa5e70f74c9dc1f', //	OLO Bratislava
    '63d1574f826c200250fb59f4', //	Mestská časť Petržalka
    '63d25e04bacf0a0f6c8a1b58', //	Mestská časť Čuňovo
    '63d25fb7bacf0a0f6c8abf59', //	Mestská časť Devín
    '63d261fbbacf0a0f6c8c05c3', //	Mestská časť Devínska Nová Ves
    '63d263ab965fb806acafab7b', //	Mestská časť Dúbravka
    '63d264f2965fb806acb00b4d', //	Mestská časť Jarovce
    '63d28c66965fb806accb5a84', //	Mestská časť Karlova Ves
    '63d28d17965fb806accbc833', //	Mestská časť Lamač
    '63d28e23965fb806accc52a5', //	Mestská časť Nové mesto
    '63d28ed3965fb806accce673', //	Mestská časť Podunajské Biskupice
    '63d28f93965fb806accd44bf', //	Mestská časť Rača
    '63d290abbacf0a0f6caa71b9', //	Mestská časť Rusovce
    '63d29147bacf0a0f6caad199', //	Mestská časť Ružinov
    '63d29266bacf0a0f6cab8d46', //	Mestská časť Staré mesto
    '63d29335bacf0a0f6cac04bc', //	Mestská časť Vajnory
    '63d293c5bacf0a0f6cac3b71', //	Mestská časť Vrakuňa
    '63d29495bacf0a0f6cac8d68', //	Mestská časť Záhorská Bytrica
  ])

  return [...eventsBa, ...eventsOther].slice(0, eventsCount).map(
    (event) =>
      ({
        id: event._id,
        title: event.ProfileName,
        url: `https://tootoot.fm/sk/events/${event._id}`,
        image: `https://api.tootoot.co/api/event/${event._id}/images/${event.ShareImage}/1200/1200/AUTO`,
        // This seems to be the best thing to display as address,
        address: event.Building?.ProfileName,
        beginDate: event.Begin,
        // If the event has no end date, it returns this:
        endDate: event.End === '9999-12-30T23:59:59Z' ? null : event.End,
      } as TootootEvent),
  )
}
