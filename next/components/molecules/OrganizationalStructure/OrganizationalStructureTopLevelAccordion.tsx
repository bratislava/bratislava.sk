import ChevronDown from '@assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '@assets/images/chevron-down-thin-small.svg'
import { GetGroupMembersRecursiveResult } from '@backend/ms-graph/types'
import cx from 'classnames'
import { useToggle } from 'rooks'

import OrganizationalStructureAccordion from './OrganizationalStructureAccordion'
import OrganizationalStructureAccordionCards from './OrganizationalStructureAccordionCards'

export type OrganizationalStructureTopLevelAccordionProps = {
  group: GetGroupMembersRecursiveResult
}

// TODO rewrite from scratch to use our Accordion and fix accessibility, but wait for new design first
const OrganizationalStructureTopLevelAccordion = ({
  group,
}: OrganizationalStructureTopLevelAccordionProps) => {
  const [open, setOpen] = useToggle()

  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer flex-col gap-y-8 pt-8" onClick={setOpen}>
        <div className="flex items-center lg:px-5">
          <div className="mr-6 h-6 w-6 shrink-0 rounded-full bg-category-600 lg:h-8 lg:w-8" />
          {/* FIXME Typography. Convert to use Typography. Issue: Header size for not header element */}
          <div className="text-h3">{group.displayName}</div>
          <div className={cx('ml-auto', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        </div>
        <div className="h-1 w-full rounded-sm border border-transparent bg-category-200" />
      </div>
      {open && (
        <div className="px-5 pt-8">
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
