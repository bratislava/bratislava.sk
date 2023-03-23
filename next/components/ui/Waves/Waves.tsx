import cx from 'classnames'

import WaveBottomLarge from './waves/WaveBottomLarge'
import WaveBottomSmall from './waves/WaveBottomSmall'
import WaveTopLarge from './waves/WaveTopLarge'
import WaveTopSmall from './waves/WaveTopSmall'

interface WavesProps {
  wavePosition: 'top' | 'bottom'
  waveColor: string
  backgroundColor?: string
  className?: string
}

export interface WavesSvgProps {
  waveColor?: string
  className?: string
}

export const Waves = ({
  className,
  backgroundColor = 'transparent',
  waveColor,
  wavePosition,
}: WavesProps) => {
  return (
    <div style={{ backgroundColor, color: waveColor }} className={cx('overflow-hidden', className)}>
      {wavePosition === 'top' && (
        <>
          <WaveTopLarge className="-mb-px hidden md:block" />
          <WaveTopSmall className="-mb-px md:hidden" waveColor={waveColor} />
        </>
      )}
      {wavePosition === 'bottom' && (
        <>
          <WaveBottomLarge className="-mt-px hidden md:block" />
          <WaveBottomSmall className="-mt-px md:hidden" waveColor={waveColor} />
        </>
      )}
    </div>
  )
}

export default Waves
