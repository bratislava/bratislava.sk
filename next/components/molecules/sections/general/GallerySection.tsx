import { GallerySectionFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import Gallery from '@components/organisms/Gallery/Gallery'
import React from 'react'

export interface GallerySectionProps {
  section: GallerySectionFragment
}

const GallerySection = ({ section: { title, text, medias } }: GallerySectionProps) => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GALLERY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
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
