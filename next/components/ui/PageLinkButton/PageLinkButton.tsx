import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ArrowRight, ChevronRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import cx from 'classnames'

export interface PageLinkButtonProps {
  className?: string
  pageLink?: { title?: string; url?: string }
}

export const PageLinkButton = ({ className, pageLink }: PageLinkButtonProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <UILink className={cx(className)} href={pageLink?.url ?? '#'}>
      <Button className="h-6 text-font" shape="none" variant="muted" icon={<ChevronRight />} hoverIcon={<ArrowRight />}>
        <div
          style={{ textDecorationThickness: 2, textUnderlineOffset: 3 }}
          className="text-font text-sm md:text-default font-semibold text-left underline"
        >
          {pageLink?.title}
        </div>
      </Button>
    </UILink>
  )
}

export default PageLinkButton
