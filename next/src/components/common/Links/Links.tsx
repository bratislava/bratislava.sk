import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ArrowRightIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

export type LinksProps = {
  className?: string
  title?: string
  pageLinks: { title?: string; url?: string }[]
}

const Links = ({ className, title, pageLinks }: LinksProps) => {
  return (
    <div className={cn('flex w-full flex-col md:w-10/12', className)}>
      {title && <Typography type="h2">{title}</Typography>}
      <ul className="flex flex-col space-y-4 pt-6">
        {pageLinks?.map((pageLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Button
              href={pageLink.url ?? '#'}
              target={pageLink.url?.startsWith('http') ? '_blank' : undefined}
              hasLinkIcon={pageLink.url?.startsWith('http')} // show link icon only for external urls since we already use arrow icon in startIcon
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
