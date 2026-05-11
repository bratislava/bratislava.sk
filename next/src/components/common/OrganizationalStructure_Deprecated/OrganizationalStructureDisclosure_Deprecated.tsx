import { Typography, TypographyProps } from '@bratislava/component-library'
import { Fragment } from 'react'

import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import OrganizationalStructureAccordionCards from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureAccordionCards_Deprecated'
import { GetGroupMembersRecursiveResult } from '@/src/services/ms-graph/types'

type OrganizationalStructureContentProps = {
  group: GetGroupMembersRecursiveResult
  headerVariant: TypographyProps['variant']
}

type TypographyVariant = NonNullable<TypographyProps['variant']>

const NESTED_ORG_STRUCTURE_HEADER_VARIANT: Partial<
  Record<TypographyVariant, TypographyVariant>
> = {
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'p-small',
}

function nestedOrganizationalHeaderVariant(
  variant: TypographyProps['variant'],
): TypographyProps['variant'] {
  if (variant == null) {
    return 'p-small'
  }

  return NESTED_ORG_STRUCTURE_HEADER_VARIANT[variant] ?? 'p-small'
}

const OrganizationalStructureDisclosure = ({
  group,
  headerVariant,
}: OrganizationalStructureContentProps) => {
  return (
    <Disclosure id={`disclosure-faq-${group.id}`}>
      <DisclosureHeader className="p-4 ring-inset lg:px-6">
        <Typography variant={headerVariant}>{group.displayName}</Typography>
      </DisclosureHeader>
      <DisclosurePanel>
        <div className="flex flex-col gap-4 px-4 lg:px-6">
          {group.users.length > 0 && <OrganizationalStructureAccordionCards users={group.users} />}
          {group.groups.length > 0 && (
            <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
              {group.groups.map((subgroup, index) => (
                <Fragment key={subgroup.id}>
                  {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
                  <OrganizationalStructureDisclosure
                    group={subgroup}
                    headerVariant={nestedOrganizationalHeaderVariant(headerVariant)}
                  />
                </Fragment>
              ))}
            </DisclosureGroup>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default OrganizationalStructureDisclosure
