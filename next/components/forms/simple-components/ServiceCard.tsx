import cx from 'classnames'

import CircleArrowRight from '../../../assets/images/circle-arrow-right.svg'

type ServiceCardBase = {
  title: string
  description: string
  buttonText: string
  iconFill: string
  Logo: ({ fill }: { fill: string }) => JSX.Element
  className?: string
}

const ServiceCard = ({
  title,
  description,
  buttonText,
  Logo,
  iconFill,
  className,
}: ServiceCardBase) => {
  const style = cx(
    'group min-w-[280px] max-w-[280px] bg-gray-0 border-gray-200 flex flex-col items-start p-5 gap-5 border-solid border-2 rounded-lg cursor-pointer',
    className,
  )

  return (
    <div className={style}>
      <div className="w-[75px] h-[75px]">
        <Logo fill={iconFill} />
      </div>
      <div className="gap-3 flex flex-col items-start w-full">
        <div className="group-hover:underline text-h-base font-semibold">{title}</div>
        <div className="text-p-sm flex items-center font-normal">{description}</div>
      </div>
      <div className="flex items-end w-full h-full">
        <div className="flex justify-between items-center h-max w-full">
          <div className="text-p-base font-semibold">{buttonText}</div>
          <CircleArrowRight />
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
