import React from 'react'
import { ArrowRightIcon } from 'src/assets/icons'

import { SectionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { LinksSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export type LinksProps = {
  title: string | null | undefined
  titleLevel?: SectionTitleLevel | null | undefined
  pageLinks: LinksSectionFragment['pageLinks']
  className?: string
}

/**
 * TODO Figma link
 */

const Links = ({ title, pageLinks, className }: LinksProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6 md:w-10/12', className)}>
      <SectionHeader title={title} />

      <ul className="flex flex-col gap-4">
        {pageLinks?.filter(isDefined).map((pageLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Button
              variant="link"
              startIcon={<ArrowRightIcon className="shrink-0" />}
              {...getLinkProps(pageLink)}
              hasLinkIcon={getLinkProps(pageLink).target === '_blank'} // show link icon only for external urls since we already use arrow icon in startIcon
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Links
