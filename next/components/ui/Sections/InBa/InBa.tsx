import cx from 'classnames'

import { InBaCard, InBaCardProps } from '../../InBaCard/InBaCard'

export interface InBaProps {
  className?: string
  inBaCards?: InBaCardProps[]
}

export const InBa = ({ className, inBaCards }: InBaProps) => (
  <div className={cx(className, 'max-w-screen-1.5xl md:mx-auto md:px-12 xl:px-40')}>
    <div className={(cx(className), 'flex flex-col items-center gap-y-20')}>
      {inBaCards?.map((inBaCard, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <InBaCard key={index} {...inBaCard} />
      ))}
    </div>
  </div>
)

export default InBa
