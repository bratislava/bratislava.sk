import cx from 'classnames'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import { GetGroupMembersRecursiveResult } from 'services/ms-graph'
import { OrganizationalStructureAccordionCards } from './OrganizationalStructureAccordionCards'
import { OrganizationalStructureAccordion } from './OrganizationalStructureAccordion'
import { useToggle } from 'rooks'

export interface OrganizationalStructureTopLevelAccordionProps {
  group: GetGroupMembersRecursiveResult
}

export const OrganizationalStructureTopLevelAccordion = ({ group }: OrganizationalStructureTopLevelAccordionProps) => {
  const [open, setOpen] = useToggle()

  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer flex-col gap-y-8 pt-8" onClick={setOpen}>
        <div className="flex items-center lg:px-5">
          <div className="mr-6 h-6 w-6 shrink-0 rounded-full bg-primary lg:h-8 lg:w-8" />
          <div className="pr-6 text-default font-semibold lg:text-lg">{group.displayName}</div>
          <div className={cx('ml-auto', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        </div>
        <div className="h-1 w-full rounded-sm border border-transparent bg-secondary" />
      </div>
      {open && (
        <div className="pt-8x">
          {group.users?.length && <OrganizationalStructureAccordionCards users={group.users} />}
          {group.groups.map((group) => (
            <OrganizationalStructureAccordion key={group.id} group={group} level={1} />
          ))}
        </div>
      )}
    </div>
  )
}
