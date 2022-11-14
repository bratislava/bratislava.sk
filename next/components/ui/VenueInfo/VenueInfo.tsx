import cx from 'classnames'

import ArrowRightLong from '../../../assets/images/arrow-right.svg'
import ArrowRightShort from '../../../assets/images/arrow-right-short.svg'
import { Button } from '../Button/Button'

export interface VenueInfoProps {
  className?: string
  title: React.ReactNode
  description: React.ReactNode
  buttonTitle: string
  linkTitle: string
}

export const VenueInfo = ({ className, title, description, buttonTitle, linkTitle }: VenueInfoProps) => (
  <div className={cx(className, 'flex flex-col gap-y-3 md:gap-y-4 w-full max-w-88')}>
    <h1 className="text-h3-medium">{title}</h1>
    <p className="text-p2">{description}</p>
    <Button className="h-10 w-40 md:mt-4 md:h-12">
      <span className="text-p2-medium md:text-p1-medium">{buttonTitle}</span>
    </Button>
    <Button
      className="w-36 text-p2-medium text-primary md:text-p1-medium"
      icon={<ArrowRightShort />}
      hoverIcon={<ArrowRightLong />}
      shape="none"
    >
      {linkTitle}
    </Button>
  </div>
)

export default VenueInfo
