import { WavesSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Waves } from '@bratislava/ui-bratislava/Waves/Waves'
import cx from 'classnames'
import React from 'react'

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
