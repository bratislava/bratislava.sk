import { Typography } from '@bratislava/component-library'
import React from 'react'

import Gallery from '@/src/components/common/Gallery/Gallery'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { GallerySectionFragment } from '@/src/services/graphql'

export type GallerySectionProps = {
  section: GallerySectionFragment
}

const GallerySection = ({ section: { title, text, medias } }: GallerySectionProps) => {
  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        {title || text ? (
          <div className="flex flex-col gap-2">
            {title && <Typography variant="h2">{title}</Typography>}
            {text && <Typography variant="p-default">{text}</Typography>}
          </div>
        ) : null}
        <Gallery images={medias.data} />
      </div>
    </SectionContainer>
  )
}

export default GallerySection
