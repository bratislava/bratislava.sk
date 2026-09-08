import { Typography, TypographyProps } from '@bratislava/component-library'

import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import OrganizationalStructureAccordionCards from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureAccordionCards_Deprecated'
import { GetGroupMembersRecursiveResult } from '@/src/services/ms-graph/types'
import { isDefined } from '@/src/utils/isDefined'

type OrganizationalStructureContentProps = {
  group: GetGroupMembersRecursiveResult
  headerVariant: TypographyProps['variant']
}

type TypographyVariant = NonNullable<TypographyProps['variant']>

const NESTED_ORG_STRUCTURE_HEADER_VARIANT: Partial<Record<TypographyVariant, TypographyVariant>> = {
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'p-small',
}

const getNestedOrganizationalHeaderVariant = (
  variant: TypographyProps['variant'],
): TypographyProps['variant'] => {
  if (!isDefined(variant)) {
    return 'p-small'
  }

  return NESTED_ORG_STRUCTURE_HEADER_VARIANT[variant] ?? 'p-small'
}

const OrganizationalStructureDisclosure = ({
  group,
  headerVariant,
}: OrganizationalStructureContentProps) => {
  return (
    <Disclosure id={`disclosure-faq-${group.id}`} data-cy="organizational-structure-accordion">
      <DisclosureHeader>
        <Typography variant={headerVariant}>{group.displayName}</Typography>
      </DisclosureHeader>
      <DisclosurePanel data-cy="organizational-structure-accordion-content">
        <div className="flex flex-col gap-4 px-4 lg:px-6">
          {group.users.length > 0 && <OrganizationalStructureAccordionCards users={group.users} />}
          {group.groups.length > 0 && (
            <DisclosureGroup>
              {group.groups.map((subgroup) => (
                <OrganizationalStructureDisclosure
                  key={subgroup.id}
                  group={subgroup}
                  headerVariant={getNestedOrganizationalHeaderVariant(headerVariant)}
                />
              ))}
            </DisclosureGroup>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default OrganizationalStructureDisclosure
