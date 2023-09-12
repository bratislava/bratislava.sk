import Button from '@components/forms/simple-components/Button'
import { isExternalLink } from '@utils/isExternalLink'
import cx from 'classnames'
import React from 'react'

export interface LinksProps {
  className?: string
  title?: string
  pageLinks: { title?: string; url?: string; anchor?: string }[]
}

export const Links = ({ className, title, pageLinks }: LinksProps) => {
  return (
    <div className={cx(className, 'flex w-full flex-col md:w-10/12')}>
      {title && <h2 className="text-h4">{title}</h2>}
      <ul className="flex flex-col space-y-4 pt-6">
        {pageLinks?.map((pageLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <Button
              href={pageLink.url ? isExternalLink(pageLink.url) : `#${pageLink.anchor}`}
              variant="black-link"
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
