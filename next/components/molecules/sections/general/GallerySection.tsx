import { Typography } from '@bratislava/component-library'
import React from 'react'

import Gallery from '@/components/organisms/Gallery/Gallery'
import { GallerySectionFragment } from '@/services/graphql'

export type GallerySectionProps = {
  section: GallerySectionFragment
}

const GallerySection = ({ section: { title, text, medias } }: GallerySectionProps) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}
      <Gallery images={medias.data} />
    </div>
  )
}

export default GallerySection
