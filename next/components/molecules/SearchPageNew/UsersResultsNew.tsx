import { MSGraphFilteredGroupUser } from '@backend/services/ms-graph'
import { userSearchFetcher } from '@backend/utils/organisationalStructure'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import LoadingOverlay from '@components/molecules/SearchPage/LoadingOverlay'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { useTranslations } from 'next-intl'
import useSwr from 'swr'

import { OrganizationalStructureAccordionCards } from '../OrganizationalStructure/OrganizationalStructureAccordionCards'

export interface UsersFilters {
  search: string
}

interface UsersResultsProps {
  title: string
  filters: UsersFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const sampleData = [
  { title: 'userTitle1', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'userTitle2', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'userTitle3', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'userTitle4', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'userTitle5', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
]

const UsersResultsNew = ({ filters, title, handleShowMore }: UsersResultsProps) => {
  const data = getData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      <SearchResultsHeader title={title} handleShowMore={handleShowMore} />
      {data?.length > 0 ? (
        <div className="divide-y-2 rounded-lg border-2">
          {data.slice(0, RESULTS_SHOWN).map((item, index) => {
            return (
              <SearchCardNew
                title={`${item.title}`}
                tag="Kontakt"
                slug={item.slug}
                metadata={item.metadata}
              />
            )
          })}
        </div>
      ) : (
        <p>No results</p>
      )}
    </div>
  )
}

const getData = (filters: UsersFilters) => {
  const t = useTranslations()

  const { data, error } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  const formattedData =
    data?.hits?.map((userData: MSGraphFilteredGroupUser) => {
      return {
        title: '',
        slug: '',
        metadata: [] ?? [],
      }
    }) ?? []

  return formattedData ?? []

  // TODO: pridat tuto funkcionalitu
  // if (loadingAndNoDataToDisplay) {
  //   return <LoadingSpinner />
  // }

  // // TODO replace by proper error
  // if (error) {
  //   return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  // }
  // return (
  //   <LoadingOverlay loading={delayedLoading}>
  //     <h2 className="text-h5 pb-6">{t('organisationalStructure')}</h2>
  //     {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
  //     <Users data={dataToDisplay!} filters={filters} />
  //   </LoadingOverlay>
  // )
}

export default UsersResultsNew

// const Users = ({ data }: { data: MSGraphFilteredGroupUser[]; filters: UsersFilters }) => {
//   const t = useTranslations()

//   // TODO Tmp fix - MSGraphFilteredGroupUser ignores '| null' in properties
//   const filteredUsers = data.filter((user) => user.displayName && user.jobTitle)

//   if (filteredUsers.length > 0) {
//     return <OrganizationalStructureAccordionCards users={filteredUsers} />
//   }
//   return <div>{t('noUsersToShow')}</div>
// }

// const DataWrapper = ({ filters }: { filters: UsersFilters }) => {
//   const t = useTranslations()

//   const { data, error } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
//     data,
//     error,
//   })

//   if (loadingAndNoDataToDisplay) {
//     return <LoadingSpinner />
//   }

//   // TODO replace by proper error
//   if (error) {
//     return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
//   }

//   return (
//     <LoadingOverlay loading={delayedLoading}>
//       <h2 className="text-h5 pb-6">{t('organisationalStructure')}</h2>
//       {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
//       <Users data={dataToDisplay!} filters={filters} />
//     </LoadingOverlay>
//   )
// }

// const UsersResultsNew = ({ filters }: UsersResultsProps) => {
//   return <DataWrapper filters={filters} />
// }

// export default UsersResultsNew
