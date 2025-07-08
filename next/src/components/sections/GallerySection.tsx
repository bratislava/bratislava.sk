import React from 'react'

import Gallery from '@/src/components/common/Gallery/Gallery'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { GallerySectionFragment } from '@/src/services/graphql'

export type GallerySectionProps = {
  section: GallerySectionFragment
}

const GallerySection = ({ section: { title, text, medias } }: GallerySectionProps) => {
  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} />
        <Gallery images={medias.data} />
      </div>
    </SectionContainer>
  )
}

export default GallerySection
