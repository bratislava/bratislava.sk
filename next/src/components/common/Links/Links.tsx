import React, { Fragment } from 'react'

import { SectionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import LinkRowCard from '@/src/components/cards/LinkRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
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

const Links = ({ title, titleLevel, pageLinks, className }: LinksProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <SectionHeader title={title} titleLevel={titleLevel} />

      <ul className="flex flex-col rounded-lg border py-2">
        {pageLinks?.filter(isDefined).map((pageLink, index) => {
          const { children: linkTitle, href } = getLinkProps(pageLink)

          return (
            <Fragment key={index}>
              {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
              <li className="w-full">
                <LinkRowCard
                  title={linkTitle}
                  linkHref={href}
                  metadata={[href]}
                  className="px-4 lg:px-6"
                />
              </li>
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Links
