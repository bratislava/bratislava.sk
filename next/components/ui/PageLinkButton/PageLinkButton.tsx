import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { Button } from '../Button/Button'

export interface PageLinkButtonProps {
  className?: string
  pageLink?: { title?: string; url?: string }
}

export const PageLinkButton = ({ className, pageLink }: PageLinkButtonProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <UILink className={cx(className)} href={pageLink?.url ?? '#'}>
      <Button
        className="text-font"
        shape="none"
        variant="muted"
        icon={<ChevronRight />}
        hoverIcon={<ArrowRight />}
      >
        <div
          style={{ textDecorationThickness: 2, textUnderlineOffset: 3 }}
          className="text-large-respo text-left font-semibold text-font underline"
        >
          {pageLink?.title}
        </div>
      </Button>
    </UILink>
  )
}

export default PageLinkButton
