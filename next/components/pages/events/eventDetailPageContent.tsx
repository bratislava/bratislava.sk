import { IEventDetail } from '@backend/dtos/eventDto'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { EventDetailCard } from '@components/molecules/presentation/EventDetailCard'
import { formatDate } from '@utils/local-date'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const breadcrumbs = [
  {
    title: 'Životné prostredie a výstavba',
    path: '/zivotne-prostredie-a-vystavba',
  },
]

const Divider = () => <div className="my-8 h-1 w-full border-b  border-gray-200" />

const EventDetailPageContent = ({
  title,
  description,
  availableTickets,
  startDate,
  thumbnail,
  program,
  address,
}: IEventDetail) => {
  const t = useTranslations()

  const onAdd = () => {}

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className="mx-auto mb-8 mt-12 max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-28">
          <div className="flex-1">
            <div className="relative mb-8 h-66 w-full overflow-hidden rounded-xl">
              <Image src={thumbnail} alt="" fill className="absolute object-cover" />
            </div>

            <p className="text-default mb-2 font-semibold">{formatDate(startDate)}</p>

            <h1 className="text-h4 mb-8 line-clamp-4">{title}</h1>

            <h3 className="text-h4 mb-4 line-clamp-4">Popis udalosti</h3>
            <p>{description}</p>

            <Divider />

            <h3 className="text-h4 mb-4 line-clamp-4">Program</h3>
            <p>{program}</p>
          </div>

          <EventDetailCard
            startDate={startDate}
            address={address}
            availableTickets={availableTickets}
            onAdd={onAdd}
          />
        </div>
      </div>
    </>
  )
}

export default EventDetailPageContent
