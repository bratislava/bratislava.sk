import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ArrowRightIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import { LinksSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getCommonLinkProps } from '@/src/utils/getCommonLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export type LinksProps = {
  title: string | null | undefined
  pageLinks: LinksSectionFragment['pageLinks']
  className?: string
}

const Links = ({ title, pageLinks, className }: LinksProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6 md:w-10/12', className)}>
      {title && <Typography type="h2">{title}</Typography>}

      <ul className="flex flex-col gap-4">
        {pageLinks?.filter(isDefined).map((pageLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Button
              variant="link"
              startIcon={<ArrowRightIcon className="shrink-0" />}
              {...getCommonLinkProps(pageLink)}
              hasLinkIcon={getCommonLinkProps(pageLink).target === '_blank'} // show link icon only for external urls since we already use arrow icon in startIcon
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Links
