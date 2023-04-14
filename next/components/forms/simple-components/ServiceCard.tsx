import CircleArrowRight from '@assets/images/circle-arrow-right.svg'
import cx from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'

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
    'group flex min-w-[280px] max-w-[280px] cursor-pointer flex-col items-start gap-5 rounded-lg border-2 border-solid border-gray-200 bg-gray-0 p-4',
    className,
  )

  const Card = () => (
    <>
      <div className="rounded-lg border-2 border-gray-200 p-1.5 lg:p-2.5">{icon}</div>
      <div className="flex w-full flex-col items-start gap-3 text-left">
        <h5 className="text-h5  leading-5 group-hover:underline lg:leading-7">{title}</h5>
        <div className="flex items-center text-p-sm font-normal">{description}</div>
      </div>
      <div className="flex h-full w-full items-end">
        <div className="flex h-max w-full items-center justify-between">
          <div className="text-p2 font-semibold">{buttonText}</div>
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
