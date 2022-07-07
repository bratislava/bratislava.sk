import { PrimatorCard, PrimatorCardProps } from '@bratislava/ui-bratislava'
import cx from 'classnames'

import Council from '../../../../assets/images/council.svg'
import Primator from '../../../../assets/images/primator.svg'

interface IProps {
  className?: string
  primatorCards?: PrimatorCardProps[]
}

// TODO fix types
const PrimatorCouncil = ({ className, primatorCards = [Primator as any, Council as any] }: IProps) => (
  <div className="flex justify-center">
    <div
      className={cx(
        className,
        'flex flex-col px-8 md:px-41 max-w-screen-1.5xl gap-y-28 xl:flex-row my-44 xl:gap-8 w-full '
      )}
    >
      {primatorCards.map((primatorCard, index) => (
        <PrimatorCard {...primatorCard} />
      ))}
    </div>
  </div>
)

export default PrimatorCouncil
