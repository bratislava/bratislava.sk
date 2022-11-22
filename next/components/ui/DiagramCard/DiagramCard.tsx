import cx from 'classnames'

import { StepperStep } from '../StepperStep/StepperStep'

export interface StaticImageData {
  src: string
  height: number
  width: number
  blurDataURL?: string
}

export interface TicketBuyDiagramCardProps {
  imgSrc: string
  imgWidth: string
  imgHeight: string
  text?: React.ReactNode
  index: number
  className?: string
}

export const DiagramCard = ({ imgSrc, imgWidth, imgHeight, text, index, className }: TicketBuyDiagramCardProps) => {
  return (
    <div
      className={cx(className, 'relative rounded-lg border-category-100 border-3 flex flex-col items-center shadow mb-2')}
    >
      <StepperStep active={false} className="absolute h-20 w-20 -translate-y-1/2 py-5 text-5xl" number={index} />

      <div className="px-12">
        {imgSrc && <img alt="diagramcard" src={imgSrc} width={imgWidth} height={imgHeight} />}
      </div>

      {text && (
        <div className="mt-8 px-5 pb-10 text-center text-base text-font">
          {typeof text === 'string' ? <p>{text}</p> : text}
        </div>
      )}
    </div>
  )
}

export default DiagramCard
