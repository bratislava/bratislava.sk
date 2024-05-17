import cx from 'classnames'
import * as React from 'react'

import AccordionSection from '@/components/molecules/sections/general/AccordionSection'
import BlogPostsByCategory from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsByCategory'
import BlogPostsByTags from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsByTags'
import BlogPostsList from '@/components/molecules/sections/general/ArticlesListSection/BlogPostsList'
import InbaArticlesList from '@/components/molecules/sections/general/ArticlesListSection/InbaArticlesList'
import BannerSection from '@/components/molecules/sections/general/BannerSection'
import CalculatorSection from '@/components/molecules/sections/general/CalculatorSection/CalculatorSection'
import ColumnedTextSection from '@/components/molecules/sections/general/ColumnedTextSection'
import ComparisonSection from '@/components/molecules/sections/general/ComparisonSection'
import ContactsSection from '@/components/molecules/sections/general/ContactsSection'
import DividerSection from '@/components/molecules/sections/general/DividerSection'
import DocumentListSection from '@/components/molecules/sections/general/DocumentListSection/DocumentListSection'
import FeaturedBlogPostsSection from '@/components/molecules/sections/general/FeaturedBlogPostsSection'
import FileListSection from '@/components/molecules/sections/general/FileListSection'
import GallerySection from '@/components/molecules/sections/general/GallerySection'
import IconTitleDescSection from '@/components/molecules/sections/general/IconTitleDescSection'
import IframeSection from '@/components/molecules/sections/general/IframeSection'
import InbaReleasesSection from '@/components/molecules/sections/general/InbaReleasesSection'
import LinksSection from '@/components/molecules/sections/general/LinksSection'
import NarrowTextSection from '@/components/molecules/sections/general/NarrowTextSection'
import NumericalListSection from '@/components/molecules/sections/general/NumericalListSection'
import OfficialBoardSection from '@/components/molecules/sections/general/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from '@/components/molecules/sections/general/OrganizationalStructureSection'
import ProsAndConsSection from '@/components/molecules/sections/general/ProsAndConsSection'
import RegulationsListSection from '@/components/molecules/sections/general/RegulationsListSection'
import RegulationsSection from '@/components/molecules/sections/general/RegulationsSection'
import TestimonialsSection from '@/components/molecules/sections/general/TestimonialsSection'
import TextWithImageSection from '@/components/molecules/sections/general/TextWithImageSection'
import TimelineSection from '@/components/molecules/sections/general/TimelineSection'
import VideosSection from '@/components/molecules/sections/general/VideosSection'
import WavesSection from '@/components/molecules/sections/general/WavesSection'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer'
import { SectionsFragment } from '@/services/graphql'

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
