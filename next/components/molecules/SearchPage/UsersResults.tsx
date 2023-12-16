import {
  getMsGraphSearchQueryKey,
  msGraphSearchFetcher,
} from '@backend/ms-graph/fetchers/msGraphSearch.fetcher'
import { MSGraphFilteredGroupUser } from '@backend/ms-graph/types'
import { Typography } from '@bratislava/component-library'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { OrganizationalStructureAccordionCards } from '../OrganizationalStructure/OrganizationalStructureAccordionCards'
import LoadingOverlay from './LoadingOverlay'

interface UsersFilters {
  search: string
}

interface UsersResultsProps {
  filters: UsersFilters
}

const Users = ({ users }: { users: MSGraphFilteredGroupUser[]; filters: UsersFilters }) => {
  const t = useTranslations()

  if (users.length > 0) {
    return <OrganizationalStructureAccordionCards users={users} />
  }
  return <div>{t('noUsersToShow')}</div>
}

const DataWrapper = ({ filters }: UsersResultsProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: getMsGraphSearchQueryKey(filters.search),
    queryFn: () => msGraphSearchFetcher(filters.search),
    keepPreviousData: true,
    select: (res) => res.data,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <LoadingOverlay loading={isLoading}>
      <Users users={data} filters={filters} />
    </LoadingOverlay>
  )
}

const UsersResults = ({ filters }: UsersResultsProps) => {
  const t = useTranslations()

  return (
    <div>
      <Typography type="h2" size="h5" className="pb-6">
        {t('organisationalStructure')}
      </Typography>
      <DataWrapper filters={filters} />
    </div>
  )
}

export default UsersResults
