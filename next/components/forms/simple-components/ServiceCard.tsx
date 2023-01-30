import cx from 'classnames'
import { FunctionComponent, HTMLAttributeAnchorTarget, SVGProps } from 'react'

import CircleArrowRight from '../../../assets/images/circle-arrow-right.svg'

type ServiceCardBase = {
  title: string
  description: string
  buttonText: string
  Logo: FunctionComponent<SVGProps<SVGSVGElement>>
  href: string
  target?: HTMLAttributeAnchorTarget | undefined
  className?: string
}

const ServiceCard = ({
  title,
  description,
  buttonText,
  Logo,
  href,
  target,
  className,
}: ServiceCardBase) => {
  const style = cx(
    'w-[280px] bg-gray-0 border-gray-200 flex flex-col items-start p-5 gap-5 border-solid border-2 rounded-lg',
    className,
  )

  return (
    <a href={href} target={target} rel="noreferrer">
      <div role="button" tabIndex={0} className={style} aria-hidden="true">
        <div className="min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] flex items-center justify-center">
          <Logo />
        </div>
        <div className="gap-3 flex flex-col items-start w-full">
          <div className="text-h-base font-semibold not-italic">{title}</div>
          <div className="text-p-sm flex items-center font-normal not-italic">{description}</div>
        </div>
        <div className="flex justify-between items-center gap-5 w-full">
          <div className="text-p-base not-italic font-semibold">{buttonText}</div>
          <CircleArrowRight />
        </div>
      </div>
    </a>
  )
}

export default ServiceCard
