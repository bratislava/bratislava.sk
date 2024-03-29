import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@backend/ms-graph/fetchers/msGraphStructure.fetcher'
import { Typography } from '@bratislava/component-library'
import LoadingSpinner from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'

import OrganizationalStructureTopLevelAccordion from './OrganizationalStructureTopLevelAccordion'

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

      <div className="flex flex-col">
        {data.groups.map((group) => (
          <OrganizationalStructureTopLevelAccordion group={group} key={group.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationalStructure
