import cx from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

import CircleArrowRight from '../../../assets/images/circle-arrow-right.svg'

type ServiceCardBase = {
  title: string
  description: string
  buttonText: string
  className?: string
  icon: ReactNode
  href?: string
  onPress?: () => void
}

const ServiceCard = ({
  title,
  description,
  buttonText,
  className,
  icon,
  href,
  onPress,
}: ServiceCardBase) => {
  const style = cx(
    'group min-w-[280px] max-w-[280px] bg-gray-0 border-gray-200 flex flex-col items-start p-4 gap-5 border-solid border-2 rounded-lg cursor-pointer',
    className,
  )

  const Card = () => (
    <>
      <div className="rounded-lg border-2 border-gray-200 p-1.5 lg:p-2.5">{icon}</div>
      <div className="flex w-full flex-col items-start gap-3 text-left">
        <h5 className="text-h5 font-semibold leading-5 group-hover:underline lg:leading-7">
          {title}
        </h5>
        <div className="flex items-center text-p-sm font-normal">{description}</div>
      </div>
      <div className="flex h-full w-full items-end">
        <div className="flex h-max w-full items-center justify-between">
          <div className="text-p2-semibold">{buttonText}</div>
          <CircleArrowRight />
        </div>
      </div>
    </>
  )

  return href ? (
    <Link href={href} className={style}>
      <Card />
    </Link>
  ) : (
    <button type="button" onClick={onPress} className={style}>
      <Card />
    </button>
  )
}

export default ServiceCard
