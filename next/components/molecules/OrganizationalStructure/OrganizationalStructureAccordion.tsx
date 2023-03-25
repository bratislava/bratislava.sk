// @ts-strict-ignore
import { GetGroupMembersRecursiveResult } from 'backend/services/ms-graph'
import cx from 'classnames'
import { useToggle } from 'rooks'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import { OrganizationalStructureAccordionCards } from './OrganizationalStructureAccordionCards'

export interface OrganizationalStructureAccordionProps {
  group: GetGroupMembersRecursiveResult
  level: number
}

// TODO replace custom accordion for unstyled lib (radix?) accordion to fix accessibility
// level 1 - always open, empty circle
// level 2 - toggleable, filled secondary circle
// level >2 - toggleable, no circle
export const OrganizationalStructureAccordion = ({
  group,
  level,
}: OrganizationalStructureAccordionProps) => {
  const [open, setOpen] = useToggle()
  const alwaysOpen = level === 1

  return (
    <div className="flex flex-col">
      <div
        className={cx('lg-gap-x-6 flex items-start lg:items-center gap-x-3', {
          'cursor-pointer': !alwaysOpen,
          'pb-8': !alwaysOpen && !open,
        })}
        onClick={alwaysOpen ? null : setOpen}
        onKeyDown={alwaysOpen ? null : setOpen}
      >
        <div
          className={cx('org-structure-list-circle', {
            'border-4 border-category-600': level === 1,
            'bg-category-200': level === 2,
            hidden: level > 2,
          })}
        />
        <div className="text-h4">{group.displayName}</div>
        {/* TODO fix chevron toggles - rotating 180 isn't quite right as the chevron 'jumps' higher - we should use
        different up-down asset */}
        <div className={cx('ml-auto pt-2.5', { 'rotate-180 pt-5': open, hidden: alwaysOpen })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {(open || alwaysOpen) && (
        <div className={cx({ 'pt-8': !group.users?.length })}>
          {!!group.users?.length && <OrganizationalStructureAccordionCards users={group.users} />}
          {!!group.groups?.length && (
            <div className="lg:ml-8">
              {group.groups.map((groupTmp) => (
                <OrganizationalStructureAccordion
                  key={groupTmp.id}
                  group={groupTmp}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
