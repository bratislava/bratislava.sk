import { WavesSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Waves } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

type WavesSectionProps = {
  section: WavesSectionFragment
}

const WavesSection = ({ section }: WavesSectionProps) => {
  return (
    <Waves
      className={cx({
        'md:mt-18 mt-10': section.position === 'top',
      })}
      key={section.position}
      isRich={section.isRich ?? undefined}
      waveColor="var(--category-color-200)"
      wavePosition={section.position ?? 'top'}
    />
  )
}

export default WavesSection
