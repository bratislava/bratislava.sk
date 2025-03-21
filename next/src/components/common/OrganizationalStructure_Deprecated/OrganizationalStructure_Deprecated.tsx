import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'

import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphStructure.fetcher'

import OrganizationalStructureTopLevelAccordion from './OrganizationalStructureTopLevelAccordion_Deprecated'

export type OrganizationalStructureProps = {
  title?: string | null
}

// TODO add search
const OrganizationalStructure = ({ title }: OrganizationalStructureProps) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: getMsGraphStructureQueryKey(),
    queryFn: () => msGraphStructureFetcher(),
    select: (res) => res.data,
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography type="h2">{title}</Typography>

      <div className="flex flex-col" data-cy="organizational-structure-container">
        {data.groups.map((group) => (
          <OrganizationalStructureTopLevelAccordion group={group} key={group.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationalStructure
