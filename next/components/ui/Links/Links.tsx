import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { isExternalLink } from '@utils/isExternalLink'
import cx from 'classnames'

import { Button } from '../Button/Button'

export interface LinksProps {
  className?: string
  title?: string
  pageLinks: { title?: string; url?: string; anchor?: string }[]
}

export const Links = ({ className, title, pageLinks }: LinksProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div>
      <div className={cx(className, 'flex w-full flex-col md:w-10/12')}>
        <h1 className="text-h4">{title}</h1>
        <div className="flex flex-col space-y-4 pt-6">
          {pageLinks?.map((pageLink, index) => (
            <Button
              key={index}
              variant="full-transparent"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              shape="none"
            >
              <UILink href={pageLink.url ? isExternalLink(pageLink.url) : `#${pageLink.anchor}`}>
                <div className="text-default relative text-left font-semibold underline decoration-2 underline-offset-4">
                  {pageLink?.title}
                </div>
              </UILink>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Links
