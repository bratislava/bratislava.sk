import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import OrganizationalStructureDisclosure from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureDisclosure_Deprecated'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphStructure.fetcher'

export type OrganizationalStructureProps = {
  title?: string | null
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

  const disclosureTitleLevel = title ? getCardTitleLevel(titleLevel) : 'h2'

  return (
    <div className="flex flex-col">
      <SectionHeader title={title} />
      <div className="flex flex-col" data-cy="organizational-structure-container">
        <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
          {data.groups.map((group, index) => {
            return (
              <Fragment key={group.id}>
                {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
                <OrganizationalStructureDisclosure
                  group={group}
                  headerVariant={disclosureTitleLevel}
                />
              </Fragment>
            )
          })}
        </DisclosureGroup>
      </div>
    </div>
  )
}

export default OrganizationalStructure
