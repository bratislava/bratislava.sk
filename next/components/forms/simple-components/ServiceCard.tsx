import cx from 'classnames'
import { ReactNode } from 'react'

import CircleArrowRight from '../../../assets/images/circle-arrow-right.svg'

type ServiceCardBase = {
  title: string
  description: string
  buttonText: string
  className?: string
  icon: ReactNode
}

const ServiceCard = ({ title, description, buttonText, className, icon }: ServiceCardBase) => {
  const style = cx(
    'group min-w-[280px] max-w-[280px] bg-gray-0 border-gray-200 flex flex-col items-start p-4 gap-5 border-solid border-2 rounded-lg cursor-pointer',
    className,
  )

  return (
    <div className={style}>
      <div className="p-1.5 lg:p-2.5 rounded-lg border-2 border-gray-200">
        <span className="w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center">{icon}</span>
      </div>
      <div className="gap-3 flex flex-col items-start w-full">
        <h5 className="text-h5 leading-5 lg:leading-7 group-hover:underline font-semibold">
          {title}
        </h5>
        <div className="text-p-sm flex items-center font-normal">{description}</div>
      </div>
      <div className="flex items-end w-full h-full">
        <div className="flex justify-between items-center h-max w-full">
          <div className="text-p2-semibold">{buttonText}</div>
          <CircleArrowRight />
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
