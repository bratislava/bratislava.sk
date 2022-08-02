import { Divider } from '@bratislava/ui-bratislava/Divider/Divider'
import { structureFetcher } from '@utils/organisationalStructure'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import { OrganizationalStructureTopLevelAccordion } from './OrganizationalStructureTopLevelAccordion'

export interface AdvancedAccordionProps {
  title?: string
  dividerStyle?: string
}

// ordering manually on top level, but this is not guaranteed to stay
// this will break if the top level structure is ever changed in Microsoft AD
// TODO consider controlling from CMS ? though it will always be tightly coupled with the AD structure
export const OrganizationalStructure = ({ title, dividerStyle }: AdvancedAccordionProps) => {
  const { data } = useSWR('organizationalStructure', structureFetcher)
  const { t } = useTranslation('common')
  return data ? (
    <div className="flex flex-col">
      <div className="pb-4 text-default font-semibold lg:text-lg">{title}</div>
      {/* TODO add search */}
      <OrganizationalStructureTopLevelAccordion group={data.groups[0]} />
      <Divider
        className="py-6 lg:py-10"
        dividerStyle={dividerStyle && dividerStyle?.length > 1 ? dividerStyle : 'mesto_01_full_width'}
      />
      <OrganizationalStructureTopLevelAccordion group={data.groups[1]} />
    </div>
  ) : (
    t('loading')
  )
}
