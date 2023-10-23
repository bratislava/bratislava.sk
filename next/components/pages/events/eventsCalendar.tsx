import { IEvent } from '@backend/dtos/eventDto'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import FullCalendar from '@fullcalendar/react'

interface Props {
  events: IEvent[]
}

export const EventsCalendar = ({ events }: Props) => {
  const onEventClick = (info: any) => {
    console.log(info)
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.map(({ title, startDate }) => ({
          title,
          date: startDate,
          interactive: true,
        }))}
        dateClick={onEventClick}
      />
    </div>
  )
}
