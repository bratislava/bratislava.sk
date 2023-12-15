import { structureFetcher } from '@backend/ms-graph/fetchers/msGraphStructureFetcher'
import { useTranslations } from 'next-intl'
import useSWR from 'swr'

import { OrganizationalStructureTopLevelAccordion } from './OrganizationalStructureTopLevelAccordion'

export interface OrganizationalStructureProps {
  title?: string | null
}

// TODO add search
export const OrganizationalStructure = ({ title }: OrganizationalStructureProps) => {
  const { data } = useSWR('organizationalStructure', structureFetcher)
  const t = useTranslations()
  return data ? (
    <div className="flex flex-col">
      {/* FIXME Typography. Convert to use Typography. Issue: Header size for not header element */}
      <div className="text-h3 pb-4">{title}</div>
      {data.groups.map((group) => (
        <div key={group.id}>
          <OrganizationalStructureTopLevelAccordion group={group} />
        </div>
      ))}
    </div>
  ) : (
    <div>{t('loading')}</div>
  )
}
