import cx from 'classnames'
import React from 'react'

import Waves from '@/components/ui/Waves/Waves'
import { WavesSectionFragment } from '@/services/graphql'

type WavesSectionProps = {
  section: WavesSectionFragment
}

const WavesSection = ({ section }: WavesSectionProps) => {
  return (
    <Waves
      className={cx({
        'mt-10 md:mt-18': section.position === 'top',
      })}
      key={section.position}
      waveColor="rgb(var(--color-category-200))"
      wavePosition={section.position ?? 'top'}
    />
  )
}

export default WavesSection
