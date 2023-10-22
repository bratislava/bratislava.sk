import { IEventsQueryData } from '@backend/dtos/eventDto'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import EventCard from '@components/molecules/presentation/EventsCard'
import SearchField from 'components/forms/widget-components/SearchField/SearchField'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

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
const EventsPageContent = ({ data }: Props) => {
  const t = useTranslations()
  const router = useRouter()

  const { total, currentPage } = data.paginationInfo

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

  return (
    <>
      <PageHeader title="Udržateľné projekty v našom meste" breadcrumbs={breadcrumbs} />

      <div className="mx-auto mt-4 max-w-screen-xl px-4 md:mt-8 lg:px-8">
        <SearchField placeholder="Placeholder" />

        <div className="m-4 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-8 ">
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
      </div>
    </>
  )
}

export default EventsPageContent
