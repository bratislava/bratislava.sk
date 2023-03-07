import { Divider } from '@bratislava/ui-bratislava/Divider/Divider'
import { structureFetcher } from 'backend/utils/organisationalStructure'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import { OrganizationalStructureTopLevelAccordion } from './OrganizationalStructureTopLevelAccordion'

export interface AdvancedAccordionProps {
  title?: string | null
  dividerStyle?: string
}

// TODO add search
export const OrganizationalStructure = ({ title, dividerStyle }: AdvancedAccordionProps) => {
  const { data } = useSWR('organizationalStructure', structureFetcher)
  const { t } = useTranslation('common')
  return data ? (
    <div className="flex flex-col">
      <div className="text-h3 pb-4">{title}</div>
      {data.groups.map((group, index) => (
        <div key={group.id}>
          {index > 0 && (
            <Divider
              className="py-6 lg:py-10"
              dividerStyle={
                dividerStyle && dividerStyle?.length > 1 ? dividerStyle : 'mesto_01_full_width'
              }
            />
          )}
          <OrganizationalStructureTopLevelAccordion group={group} />
        </div>
      ))}
    </div>
  ) : (
    <div>{t('loading')}</div>
  )
}
