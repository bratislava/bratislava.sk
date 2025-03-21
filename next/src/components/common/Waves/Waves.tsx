import cn from '@/src/utils/cn'

import WaveBottomLarge from './waves/WaveBottomLarge'
import WaveBottomSmall from './waves/WaveBottomSmall'
import WaveTopLarge from './waves/WaveTopLarge'
import WaveTopSmall from './waves/WaveTopSmall'

type WavesProps = {
  wavePosition: 'top' | 'bottom'
  waveColor: string
  backgroundColor?: string
  className?: string
}

const Waves = ({
  className,
  backgroundColor = 'transparent',
  waveColor,
  wavePosition,
}: WavesProps) => {
  return (
    <div
      aria-hidden
      style={{ backgroundColor, color: waveColor }}
      className={cn('overflow-hidden', className)}
    >
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
