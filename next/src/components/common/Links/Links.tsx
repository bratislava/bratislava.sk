import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ArrowRightIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { isExternalLink } from '@/src/utils/isExternalLink'

export type LinksProps = {
  className?: string
  title?: string
  pageLinks: { title?: string; url?: string; anchor?: string }[]
}

// TODO revisit anchors, they are not currently used and supported by dev team
const Links = ({ className, title, pageLinks }: LinksProps) => {
  return (
    <div className={cn('flex w-full flex-col md:w-10/12', className)}>
      {title && <Typography type="h2">{title}</Typography>}
      <ul className="flex flex-col space-y-4 pt-6">
        {pageLinks?.map((pageLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Button
              href={pageLink.url ? isExternalLink(pageLink.url) : `#${pageLink.anchor}`}
              variant="black-link"
              startIcon={<ArrowRightIcon className="shrink-0" />}
            >
              {pageLink?.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Links
