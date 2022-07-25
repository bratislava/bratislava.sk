import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { ArrowRight, ChevronRight } from '../../../assets/images'
import { Button } from '../Button/Button'

export interface PageLinkButtonProps {
  className?: string
  pageLink?: { title?: string; url?: string }
}

export const PageLinkButton = ({ className, pageLink }: PageLinkButtonProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <UILink className={cx(className)} href={pageLink?.url ?? '#'}>
      <Button className="min-h-6 text-font" shape="none" variant="muted" icon={<ChevronRight />} hoverIcon={<ArrowRight />}>
        <div
          style={{ textDecorationThickness: 2, textUnderlineOffset: 3 }}
          className="text-left text-sm font-semibold text-font underline md:text-default"
        >
          {pageLink?.title}
        </div>
      </Button>
    </UILink>
  )
}

export default PageLinkButton
