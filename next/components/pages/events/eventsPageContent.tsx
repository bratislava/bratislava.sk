import { CalendarIcon, GridIcon } from '@assets/ui-icons'
import { IEventsQueryData } from '@backend/dtos/eventDto'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import Button from '@components/forms/simple-components/Button'
import EventCard from '@components/molecules/presentation/EventsCard'
import SearchField from 'components/forms/widget-components/SearchField/SearchField'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { EventsCalendar } from './eventsCalendar'

const itemsPerPageDesktop = 10
interface Props {
  data?: IEventsQueryData
}

const breadcrumbs = [
  {
    title: 'Životné prostredie a výstavba',
    path: '/zivotne-prostredie-a-vystavba',
  },
]

type ViewType = 'grid' | 'calendar'

const buttonTypes = [
  {
    label: 'Grid',
    icon: <GridIcon />,
    type: 'grid',
  },
  {
    label: 'Calendar',
    icon: <CalendarIcon />,
    type: 'calendar',
  },
]

const EventsPageContent = ({ data }: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const [viewType, setViewType] = useState<ViewType>('calendar')

  const { total, currentPage } = data.paginationInfo

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

  return (
    <>
      <PageHeader title="Podujatia" breadcrumbs={breadcrumbs} />

      <div className="mx-auto mt-4 max-w-screen-xl px-4 md:mt-8 lg:px-8">
        <SearchField placeholder="Placeholder" />

        <div className="mb-4 mt-8 flex items-center justify-between">
          <h2 className="font-light text-gray-700">{t('eventsFound', { total })}</h2>

          <div className="flex gap-2">
            {buttonTypes.map(({ label, icon, type }) => (
              <Button
                key={label}
                variant={viewType === type ? 'category' : 'category-outline'}
                size="sm"
                icon={icon}
                onPress={() => setViewType(type as ViewType)}
              />
            ))}
          </div>
        </div>

        {viewType === 'calendar' ? (
          <EventsCalendar events={data?.events} />
        ) : (
          <>
            <div className="my-4 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-8 ">
              {data?.events?.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="mb-12 mt-8">
              <Pagination
                totalCount={Math.ceil(total / itemsPerPageDesktop)}
                currentPage={+currentPage}
                onPageChange={onChangePage}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EventsPageContent
