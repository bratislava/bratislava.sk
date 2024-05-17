import SectionContainer from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import cx from 'classnames'
import * as React from 'react'

import { SectionsFragment } from '@/backend/graphql'
import BlogPostsByCategory from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsByCategory'
import BlogPostsByTags from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsByTags'
import BlogPostsList from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsList'
import InbaArticlesList from '@/components/molecules/sections/general/ArticlesListSection/InbaArticlesList'
import ContactsSection from '@/components/molecules/sections/general/ContactsSection'
import FeaturedBlogPostsSection from '@/components/molecules/sections/general/FeaturedBlogPostsSection'
import InbaReleasesSection from '@/components/molecules/sections/general/InbaReleasesSection'
import RegulationsSection from '@/components/molecules/sections/general/RegulationsSection'
import TestimonialsSection from '@/components/molecules/sections/general/TestimonialsSection'

import AccordionSection from './sections/general/AccordionSection'
import BannerSection from './sections/general/BannerSection'
import CalculatorSection from './sections/general/CalculatorSection/CalculatorSection'
import ColumnedTextSection from './sections/general/ColumnedTextSection'
import ComparisonSection from './sections/general/ComparisonSection'
import DividerSection from './sections/general/DividerSection'
import DocumentListSection from './sections/general/DocumentListSection/DocumentListSection'
import FileListSection from './sections/general/FileListSection'
import GallerySection from './sections/general/GallerySection'
import IconTitleDescSection from './sections/general/IconTitleDescSection'
import IframeSection from './sections/general/IframeSection'
import LinksSection from './sections/general/LinksSection'
import NarrowTextSection from './sections/general/NarrowTextSection'
import NumericalListSection from './sections/general/NumericalListSection'
import OfficialBoardSection from './sections/general/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from './sections/general/OrganizationalStructureSection'
import ProsAndConsSection from './sections/general/ProsAndConsSection'
import RegulationsListSection from './sections/general/RegulationsListSection'
import TextWithImageSection from './sections/general/TextWithImageSection'
import TimelineSection from './sections/general/TimelineSection'
import VideosSection from './sections/general/VideosSection'
import WavesSection from './sections/general/WavesSection'

const SectionContent = ({ section }: { section: SectionsFragment }) => {
  switch (section.__typename) {
    case 'ComponentSectionsNarrowText':
      return <NarrowTextSection section={section} />

    case 'ComponentSectionsIconTitleDesc':
      return <IconTitleDescSection section={section} />

    case 'ComponentSectionsDocumentList':
      return <DocumentListSection />

    case 'ComponentSectionsColumnedText':
      return <ColumnedTextSection section={section} />

    case 'ComponentSectionsTextWithImage':
      return <TextWithImageSection section={section} />

    case 'ComponentSectionsFileList':
      return <FileListSection section={section} />

    case 'ComponentSectionsDivider':
      return <DividerSection section={section} />

    case 'ComponentSectionsLinks':
      return <LinksSection section={section} />

    case 'ComponentSectionsAccordion':
      return <AccordionSection section={section} />

    case 'ComponentSectionsCalculator':
      return <CalculatorSection section={section} />

    case 'ComponentSectionsVideos':
      return <VideosSection section={section} />

    case 'ComponentSectionsBlogPostsList':
      return <BlogPostsList section={section} />

    case 'ComponentSectionsBlogPostsByTags':
      return <BlogPostsByTags section={section} />

    case 'ComponentSectionsBlogPostsByCategory':
      return <BlogPostsByCategory section={section} />

    case 'ComponentSectionsInbaArticlesList':
      return <InbaArticlesList section={section} />

    case 'ComponentSectionsInbaReleases':
      return <InbaReleasesSection section={section} />

    case 'ComponentSectionsOrganizationalStructure':
      return <OrganizationalStructureSection section={section} />

    case 'ComponentSectionsGallery':
      return <GallerySection section={section} />

    case 'ComponentSectionsIframe':
      return <IframeSection section={section} />

    case 'ComponentSectionsOfficialBoard':
      return <OfficialBoardSection />

    case 'ComponentSectionsProsAndConsSection':
      return <ProsAndConsSection section={section} />

    case 'ComponentSectionsComparisonSection':
      return <ComparisonSection section={section} />

    case 'ComponentSectionsBanner':
      return <BannerSection section={section} />

    case 'ComponentSectionsTimeline':
      return <TimelineSection section={section} />

    case 'ComponentSectionsFeaturedBlogPosts':
      return <FeaturedBlogPostsSection section={section} />

    case 'ComponentSectionsContactsSection':
      return <ContactsSection section={section} />

    case 'ComponentSectionsRegulationsList':
      return <RegulationsListSection />

    case 'ComponentSectionsRegulations':
      return <RegulationsSection section={section} />

    case 'ComponentSectionsTestimonials':
      return <TestimonialsSection section={section} />

    default:
      return null
  }
}

const Section = ({ section }: { section: SectionsFragment | null }) => {
  if (!section) return null

  if (section.__typename === 'ComponentSectionsWaves') return <WavesSection section={section} />

  if (section.__typename === 'ComponentSectionsNumericalList') {
    return <NumericalListSection section={section} />
  }

  const hasBackground = ('hasBackground' in section && section.hasBackground) ?? false

  return (
    <SectionContainer
      className={cx('pt-10 md:pt-18', {
        'bg-category-200 pb-14 md:pb-18': hasBackground,
      })}
      hasBackground={hasBackground}
    >
      <SectionContent section={section} />
    </SectionContainer>
  )
}

const Sections = ({ sections }: { sections: (SectionsFragment | null)[] }) => {
  return (
    <>
      {sections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Section key={index} section={section} />
      ))}
    </>
  )
}

export default Sections
