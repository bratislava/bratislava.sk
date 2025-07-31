import React from 'react'

import Gallery from '@/src/components/common/Gallery/Gallery'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { GallerySectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type GallerySectionProps = {
  section: GallerySectionFragment
}

const GallerySection = ({
  section: { title, text, medias, titleLevelGallerySection: titleLevel },
}: GallerySectionProps) => {
  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} titleLevel={titleLevel} text={text} />
        <Gallery images={medias.filter(isDefined)} />
      </div>
    </SectionContainer>
  )
}

export default GallerySection
