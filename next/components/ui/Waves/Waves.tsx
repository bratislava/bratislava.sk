import cx from 'classnames'

import WaveBottomLarge from './waves/WaveBottomLarge'
import WaveBottomSmall from './waves/WaveBottomSmall'
import WaveTopLarge from './waves/WaveTopLarge'
import WaveTopSmall from './waves/WaveTopSmall'

export interface WavesProps {
  className?: string
  waveColor: string
  outerLinesColor?: string
  innerLinesColor?: string
  backgroundColor?: string
  wavePosition: 'top' | 'bottom'
  isRich?: boolean
}

export interface WaveProps {
  isRich?: boolean
  waveColor: string
  outerLinesColor?: string
  innerLinesColor?: string
  className?: string
}

export const Waves = ({
  className,
  backgroundColor,
  waveColor,
  wavePosition,
  outerLinesColor,
  innerLinesColor,
  isRich,
}: WavesProps) => {
  const waveProps: WaveProps = {
    isRich,
    waveColor,
    outerLinesColor: outerLinesColor || waveColor,
    innerLinesColor: innerLinesColor || backgroundColor || 'white',
  }

  return (
    <div style={{ backgroundColor }} className={cx('overflow-hidden', className)}>
      {wavePosition === 'top' && (
        <>
          <WaveTopLarge className="-mb-0.5 hidden md:block" {...waveProps} />
          <WaveTopSmall className="md:hidden " {...waveProps} />
        </>
      )}
      {wavePosition === 'bottom' && (
        <>
          <WaveBottomLarge className="hidden md:block" {...waveProps} />
          <WaveBottomSmall className="md:hidden" {...waveProps} />
        </>
      )}
    </div>
  )
}

export default Waves
