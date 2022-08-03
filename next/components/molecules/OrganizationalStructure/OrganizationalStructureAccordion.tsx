import { roleOrderingScore } from '@utils/organisationalStructure'
import cx from 'classnames'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import { GetGroupMembersRecursiveResult } from 'services/ms-graph'
import { OrganizationalStructureAccordionCards } from './OrganizationalStructureAccordionCards'
import { useToggle } from 'rooks'

export interface OrganizationalStructureAccordionProps {
  group: GetGroupMembersRecursiveResult
  level: number
}

// TODO replace custom accordion for unstyled lib (radix?) accordion to fix accessibility
// level 1 - always open, empty circle
// level 2 - toggleable, filled secondary circle
// level >2 - toggleable, no circle
export const OrganizationalStructureAccordion = ({ group, level }: OrganizationalStructureAccordionProps) => {
  const [open, setOpen] = useToggle()
  const alwaysOpen = level === 1
  // put leadership in front
  const orderedUsers = group.users?.sort((a, b) => {
    const aScore = roleOrderingScore(a.jobTitle)
    const bScore = roleOrderingScore(b.jobTitle)
    const difference = bScore - aScore
    return difference === 0 ? a.displayName.localeCompare(b.displayName) : difference
  })
  // first level order given manually and (for now) comes correctly from AD, from second onwards it makes sense to order by name (TODO verify)
  const orderedGroups =
    level > 1 ? group.groups?.sort((a, b) => a.displayName.localeCompare(b.displayName)) : group.groups
  return (
    <div className="flex flex-col">
      <div
        className={cx('flex items-start lg:items-center gap-x-3 lg-gap-x-6', {
          'cursor-pointer': !alwaysOpen,
          'pb-8': !alwaysOpen && !open,
        })}
        onClick={alwaysOpen ? null : setOpen}
      >
        <div
          className={cx('h-6 w-6 rounded-full', {
            'border-4 border-primary': level === 1,
            'bg-secondary': level === 2,
            hidden: level > 2,
          })}
        />
        <div className="pr-6 text-default lg:text-md">{group.displayName}</div>
        {/* TODO fix chevron toggles - rotating 180 isn't quite right as the chevron 'jumps' higher - we should use
        different up-down asset */}
        <div className={cx('ml-auto pt-2.5', { 'rotate-180 pt-5': open, hidden: alwaysOpen })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {(open || alwaysOpen) && (
        <div className="">
          {!!orderedUsers?.length && <OrganizationalStructureAccordionCards users={orderedUsers} />}
          {!!orderedGroups?.length && (
            <div className="lg:ml-7.5">
              {orderedGroups.map((group) => (
                <OrganizationalStructureAccordion key={group.id} group={group} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
