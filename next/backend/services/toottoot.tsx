/* eslint-disable no-underscore-dangle */

type ToottootEvent = {
  _id: string
  ProfileName?: string
  ShareImage?: string
  Begin?: string
  End?: string
  AddressContact?: {
    AddressLine?: string
  }
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

  return result.json()
}

export const getTootTootHomepageEvents = async () => {
  const events = await fetchTootTootHomepageEvents()
  return events.map((event: ToottootEvent) => ({
    id: event._id,
    title: event.ProfileName,
    url: `https://tootoot.co/event/${event._id}`,
    image: `https://api.tootoot.co/api/event/${event._id}/images/${event.ShareImage}/1200/1200/AUTO`,
    address: event.AddressContact?.AddressLine,
  }))
}
