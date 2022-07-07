import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { ArrowRight, ChevronRight } from '../../../assets/images'
import { isItExternal } from '../BAStickyMenu/external-link'
import Button from '../Button/Button'

export interface LinksProps {
  className?: string
  title?: string
  pageLinks: { title?: string; url?: string; anchor?: string }[]
}

export const Links = ({ className, title, pageLinks }: LinksProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div>
      <div className={cx(className, 'flex flex-col w-full md:w-10/12')}>
        <h1 className="text-md font-semibold">{title}</h1>
        <div className="flex flex-col space-y-4 pt-6">
          {pageLinks?.map((pageLink, index) => (
            <Button
              key={index}
              variant="full-transparent"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              shape="none"
            >
              <UILink href={pageLink.url ? isItExternal(pageLink.url) : `#${pageLink.anchor}`}>
                <div className="relative text-left text-sm font-semibold underline decoration-2 underline-offset-4">
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
