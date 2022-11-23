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
    <h1 className="text-h3 font-medium">{title}</h1>
    <p className="text-base font-normal">{description}</p>
    <Button className="h-10 w-40 md:mt-4 md:h-12">
      <span className="text-base font-medium md:text-default">{buttonTitle}</span>
    </Button>
    <Button
      className="w-36 text-base font-medium text-category-600 md:text-default"
      icon={<ArrowRightShort />}
      hoverIcon={<ArrowRightLong />}
      shape="none"
    >
      {linkTitle}
    </Button>
  </div>
)

export default VenueInfo
