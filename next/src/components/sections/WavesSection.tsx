import React from 'react'

import Waves from '@/src/components/common/Waves/Waves'
import { WavesSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type WavesSectionProps = {
  section: WavesSectionFragment
}

const WavesSection = ({ section }: WavesSectionProps) => {
  return (
    <Waves
      className={cn({
        'mt-10 md:mt-18': section.position === 'top',
      })}
      key={section.position}
      waveColor="rgb(var(--color-category-200))"
      wavePosition={section.position ?? 'top'}
    />
  )
}

export default WavesSection
