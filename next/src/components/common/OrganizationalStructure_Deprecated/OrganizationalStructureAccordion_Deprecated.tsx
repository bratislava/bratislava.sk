import { useToggle } from 'usehooks-ts'

import ChevronDown from '@/src/assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '@/src/assets/images/chevron-down-thin-small.svg'
import { GetGroupMembersRecursiveResult } from '@/src/services/ms-graph/types'
import cn from '@/src/utils/cn'

import OrganizationalStructureAccordionCards from './OrganizationalStructureAccordionCards_Deprecated'

export type OrganizationalStructureAccordionProps = {
  group: GetGroupMembersRecursiveResult
  level: number
}

// TODO rewrite from scratch to use our Accordion and fix accessibility, but wait for new design first
// level 1 - toggleable, empty circle (before, it was always open
// level 2 - toggleable, filled secondary circle
// level >2 - toggleable, no circle
const OrganizationalStructureAccordion = ({
  group,
  level,
}: OrganizationalStructureAccordionProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <div className="flex flex-col">
      <div
        role="button"
        onClick={toggleIsOpen}
        onKeyDown={toggleIsOpen}
        className={cn('lg-gap-x-6 flex cursor-pointer items-start gap-x-3 lg:items-center', {
          'pb-8': !isOpen,
        })}
      >
        <div
          className={cn('h-6 w-6 min-w-[24px] rounded-full', {
            'border-4 border-category-600': level === 1,
            'bg-category-200': level === 2,
            hidden: level > 2,
          })}
        />
        <div className="text-h4">{group.displayName}</div>
        {/* TODO fix chevron toggles - rotating 180 isn't quite right as the chevron 'jumps' higher - we should use
        different up-down asset */}
        <div className={cn('ml-auto pt-2.5', { 'rotate-180 pt-5': isOpen })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {isOpen && (
        <div className={cn({ 'pt-8': !group.users?.length })}>
          {group.users?.length ? (
            <OrganizationalStructureAccordionCards users={group.users} />
          ) : null}
          {group.groups?.length ? (
            <div className="lg:ml-8">
              {group.groups.map((groupTmp) => (
                <OrganizationalStructureAccordion
                  key={groupTmp.id}
                  group={groupTmp}
                  level={level + 1}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default OrganizationalStructureAccordion
