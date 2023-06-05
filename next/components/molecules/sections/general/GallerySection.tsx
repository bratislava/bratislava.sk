import { GallerySectionFragment } from '@backend/graphql'
import Gallery from '@components/organisms/Gallery/Gallery'
import React from 'react'

export interface GallerySectionProps {
  section: GallerySectionFragment
}

const GallerySection = ({ section: { title, text, medias } }: GallerySectionProps) => {
  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="flex flex-col gap-2 lg:pt-18">
          {title && <h2 className="text-h2">{title}</h2>}
          {text && <div>{text}</div>}
        </div>
      ) : null}
      <Gallery images={medias.data} />
    </div>
  )
}

export default GallerySection
