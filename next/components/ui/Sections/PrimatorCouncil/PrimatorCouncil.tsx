import cx from 'classnames'

import { PrimatorCard, PrimatorCardProps } from '../../PrimatorCard/PrimatorCard'

interface IProps {
  className?: string
  primatorCards: PrimatorCardProps[]
}

export const PrimatorCouncil = ({ className, primatorCards }: IProps) => (
  <div className={cx(className, 'flex w-full flex-col gap-y-12 lg:flex-row lg:gap-x-8')}>
    {primatorCards?.map((primatorCard, index) => (
      <PrimatorCard key={index} {...primatorCard} />
    ))}
  </div>
)

export default PrimatorCouncil
