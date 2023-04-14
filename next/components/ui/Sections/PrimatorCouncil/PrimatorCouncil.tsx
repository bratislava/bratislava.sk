import cx from 'classnames'

import { PrimatorCard, PrimatorCardProps } from '../../PrimatorCard/PrimatorCard'

interface IProps {
  className?: string
  primatorCards: PrimatorCardProps[]
}

export const PrimatorCouncil = ({ className, primatorCards }: IProps) => (
  <div className={cx(className, 'flex w-full flex-col gap-4 lg:flex-row lg:gap-8')}>
    {primatorCards?.map((primatorCard, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PrimatorCard key={index} {...primatorCard} />
    ))}
  </div>
)

export default PrimatorCouncil
