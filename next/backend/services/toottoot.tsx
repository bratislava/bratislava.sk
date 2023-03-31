/* eslint-disable no-underscore-dangle */

type ToottootEventResponse = {
  _id: string
  ProfileName?: string
  ShareImage?: string
  Begin?: string
  End?: string
  AddressContact?: {
    AddressLine?: string
  }
}

export type ToottootEvent = {
  id: string
  title: string
  url: string
  image: string
  address?: string
}

/**
 * Documentation: https://github.com/bratislava/bratislava.sk/files/11027013/Tootoot.Lippu.API.documentation.Profile.pdf
 */
const fetchTootTootHomepageEvents = async () => {
  const result = await fetch(
    'https://api.tootoot.co/api/event?eventBegin=Future&page=0&perPage=8&profileId=63dabb7abacf0a031cd19693',
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.tootoot.v2.1+json',
      },
    },
  )

  return result.json() as Promise<ToottootEventResponse[]>
}

export const getTootTootHomepageEvents = async () => {
  const events = await fetchTootTootHomepageEvents()

  return events.map(
    (event: ToottootEventResponse) =>
      ({
        id: event._id,
        title: event.ProfileName,
        url: `https://tootoot.co/event/${event._id}`,
        image: `https://api.tootoot.co/api/event/${event._id}/images/${event.ShareImage}/1200/1200/AUTO`,
        address: event.AddressContact?.AddressLine,
      } as ToottootEvent),
  )
}
