import { ChevronDownIcon } from 'src/assets/icons'
import { useToggle } from 'usehooks-ts'

import { GetGroupMembersRecursiveResult } from '@/src/services/ms-graph/types'
import cn from '@/src/utils/cn'

import OrganizationalStructureAccordion from './OrganizationalStructureAccordion_Deprecated'
import OrganizationalStructureAccordionCards from './OrganizationalStructureAccordionCards_Deprecated'

export type OrganizationalStructureTopLevelAccordionProps = {
  group: GetGroupMembersRecursiveResult
}

// TODO rewrite from scratch to use our Accordion and fix accessibility, but wait for new design first
const OrganizationalStructureTopLevelAccordion = ({
  group,
}: OrganizationalStructureTopLevelAccordionProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <div className="flex flex-col" data-cy="organizational-structure-accordion">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="flex cursor-pointer flex-col gap-y-8 pt-8" onClick={toggleIsOpen}>
        <div className="flex items-center lg:px-5">
          <div className="mr-6 size-6 shrink-0 rounded-full bg-category-600 lg:size-8" />
          {/* FIXME Typography. Convert to use Typography. Issue: Header size for not header element */}
          <div className="text-h3">{group.displayName}</div>
          <div className={cn('ml-auto', { 'rotate-180': isOpen })}>
            <ChevronDownIcon className="size-6 lg:size-8" />
          </div>
        </div>
        <div className="h-1 w-full rounded-xs border border-transparent bg-category-200" />
      </div>
      {isOpen && (
        <div className="pl-4" data-cy="organizational-structure-accordion-content">
          {group.users.length > 0 && <OrganizationalStructureAccordionCards users={group.users} />}
          {group.groups.map((groupInner) => (
            <OrganizationalStructureAccordion key={groupInner.id} group={groupInner} level={1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OrganizationalStructureTopLevelAccordion
