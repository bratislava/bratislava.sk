import { MSGraphFilteredGroupUser } from '@backend/services/ms-graph'
import { userSearchFetcher } from '@backend/utils/organisationalStructure'
import { LoadingSpinner } from '@bratislava/ui-bratislava'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { useTranslation } from 'next-i18next'
import useSwr from 'swr'

import { OrganizationalStructureAccordionCards } from '../OrganizationalStructure/OrganizationalStructureAccordionCards'
import LoadingOverlay from './LoadingOverlay'

interface UsersFilters {
  search: string
}

interface UsersResultsProps {
  filters: UsersFilters
}

const Users = ({ data }: { data: MSGraphFilteredGroupUser[]; filters: UsersFilters }) => {
  const { t } = useTranslation('common')

  // TODO: Tmp fix - MSGraphFilteredGroupUser ignores '| null' in properties
  const filteredUsers = data.filter((user) => user.displayName && user.jobTitle)

  console.log('users', filteredUsers)

  if (filteredUsers.length > 0) {
    return <OrganizationalStructureAccordionCards users={filteredUsers} />
  }
  return <div>{t('noUsersToShow')}</div>
}

const DataWrapper = ({ filters }: { filters: UsersFilters }) => {
  const { t } = useTranslation('common')

  const { data, error } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({ data, error })

  if (loadingAndNoDataToDisplay) {
    return <LoadingSpinner />
  }

  // TODO replace by proper error
  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <LoadingOverlay loading={delayedLoading}>
      <h2 className="text-default lg:text-md pb-6 font-semibold">{t('organisationalStructure')}</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <Users data={dataToDisplay!} filters={filters} />
    </LoadingOverlay>
  )
}

const UsersResults = ({ filters }: UsersResultsProps) => {
  return <DataWrapper filters={filters} />
}

export default UsersResults
