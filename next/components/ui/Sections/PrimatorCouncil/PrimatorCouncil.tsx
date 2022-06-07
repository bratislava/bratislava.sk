import cx from 'classnames'
import { PrimatorCard, PrimatorCardProps } from '../../PrimatorCard/PrimatorCard'

interface IProps {
  className?: string
  primatorCards: PrimatorCardProps[]
}

export const PrimatorCouncil = ({ className, primatorCards }: IProps) => (
  <div className={cx(className, 'flex flex-col lg:flex-row lg:gap-x-8 gap-y-12 w-full')}>
    {primatorCards?.map((primatorCard, index) => (
      <PrimatorCard key={index} {...primatorCard} />
    ))}
  </div>
)

export default PrimatorCouncil
