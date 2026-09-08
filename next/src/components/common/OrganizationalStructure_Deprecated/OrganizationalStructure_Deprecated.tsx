import { useQuery } from '@tanstack/react-query'

import { getCardTitleLevel, SectionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import OrganizationalStructureDisclosure from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureDisclosure_Deprecated'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphStructure.fetcher'

export type OrganizationalStructureProps = {
  title?: string | null
  titleLevel?: SectionTitleLevel | null | undefined
}

/**
 * TODO Figma link
 */

// TODO add search
const OrganizationalStructure = ({ title, titleLevel }: OrganizationalStructureProps) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: getMsGraphStructureQueryKey(),
    queryFn: () => msGraphStructureFetcher(),
    select: (res) => res.data,
  })

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="whitespace-pre">{JSON.stringify(error, null, 2)}</div>
  }

  const accordionTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <div className="flex flex-col">
      <SectionHeader title={title} titleLevel={titleLevel} />
      <DisclosureGroup data-cy="organizational-structure-container">
        {data.groups.map((group) => (
          <OrganizationalStructureDisclosure
            key={group.id}
            group={group}
            headerVariant={accordionTitleLevel}
          />
        ))}
      </DisclosureGroup>
    </div>
  )
}

export default OrganizationalStructure
