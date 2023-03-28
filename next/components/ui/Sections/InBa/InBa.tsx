import cx from 'classnames'

import Image1 from '../../../../assets/images/inBa1.svg'
import Image2 from '../../../../assets/images/inBa2.svg'
import { InBaCard, InBaCardProps } from '../../InBaCard/InBaCard'

export interface InBaProps {
  className?: string
  inBaCards?: InBaCardProps[]
}

const INBACARDS = [
  {
    // TODO fix types
    images: [Image1 as any, Image2 as any],
    title: 'in.ba',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonContent: 'Lorem ipsum dolor',
  },
  {
    images: [Image1 as any, Image2 as any],
    title: 'in.ba',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    buttonContent: 'Lorem ipsum dolor',
  },
]

export const InBa = ({ className, inBaCards = INBACARDS }: InBaProps) => (
  <div className={cx(className, 'max-w-screen-1.5xl md:mx-auto md:px-12 xl:px-40')}>
    <div className={(cx(className), 'flex flex-col items-center gap-y-20')}>
      {inBaCards?.map((inBaCard, index) => (
        <InBaCard key={index} {...inBaCard} />
      ))}
    </div>
  </div>
)

export default InBa
