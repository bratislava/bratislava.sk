export interface IEvent {
  id: number
  title: string
  description: string
  address: string
  program: string
  place: string
  phase: string
  startDate: string
  dateEnd: string
  latitude: number
  longitude: number
  thumbnail: string
  category: string
  type: string
  phoneNumber: string
  email: string
  website: string
  availableTickets: number
  isUserEvent: boolean
  createdAt: string
  updatedAt: string
}

export interface IEventsQueryData {
  events: IEvent[]
  paginationInfo: {
    total: number
    currentPage: number
    pageSize: number
  }
}

export interface IEventDetail {
  id: number
  title: string
  description: string
  address: string
  program: string
  place: string
  phase: string
  date: string
  latitude: number
  longitude: number
  thumbnail: string
  category: string
  type: string
  phoneNumber: string
  email: string
  website: string
  availableTickets: number
  isUserEvent: boolean
  createdAt: string
  updatedAt: string
}
