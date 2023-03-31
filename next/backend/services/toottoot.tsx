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
  // https://ttstor1.blob.core.windows.net/images/Event/64064afae7ff300f3c8a03e1/f620ab8b-de74-4e16-81bd-5feafe453978_1200_600.jpg

  const events = await fetchTootTootHomepageEvents()
  return events.map((event: ToottootEvent) => ({
    id: event._id,
    title: event.ProfileName,
    url: `https://tootoot.co/event/${event._id}`,
    image: `https://api.tootoot.co/api/event/${event._id}/images/${event.ShareImage}/1200/1200/AUTO`,
    address: event.AddressContact?.AddressLine,
  }))
}
