import cx from 'classnames'
import * as React from 'react'

import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import AccordionSection from '@/components/sections/AccordionSection'
import BlogPostsByCategory from '@/components/sections/ArticlesListSection/BlogPostsByCategory'
import BlogPostsByTags from '@/components/sections/ArticlesListSection/BlogPostsByTags'
import BlogPostsList from '@/components/sections/ArticlesListSection/BlogPostsList'
import InbaArticlesList from '@/components/sections/ArticlesListSection/InbaArticlesList'
import BannerSection from '@/components/sections/BannerSection'
import CalculatorSection from '@/components/sections/CalculatorSection_Deprecated/CalculatorSection_Deprecated'
import ColumnedTextSection from '@/components/sections/ColumnedTextSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import ContactsSection from '@/components/sections/ContactsSection'
import DividerSection from '@/components/sections/DividerSection'
import FeaturedBlogPostsSection from '@/components/sections/FeaturedBlogPostsSection'
import FileListSection from '@/components/sections/FileListSection'
import GallerySection from '@/components/sections/GallerySection'
import IconTitleDescSection from '@/components/sections/IconTitleDescSection'
import IframeSection from '@/components/sections/IframeSection'
import InbaReleasesSection from '@/components/sections/InbaReleasesSection'
import LinksSection from '@/components/sections/LinksSection'
import NarrowTextSection from '@/components/sections/NarrowTextSection'
import NumericalListSection from '@/components/sections/NumericalListSection'
import OfficialBoardSection from '@/components/sections/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from '@/components/sections/OrganizationalStructureSection'
import ProsAndConsSection from '@/components/sections/ProsAndConsSection'
import RegulationsListSection from '@/components/sections/RegulationsListSection'
import RegulationsSection from '@/components/sections/RegulationsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TextWithImageSection from '@/components/sections/TextWithImageSection'
import TimelineSection from '@/components/sections/TimelineSection'
import VideosSection from '@/components/sections/VideosSection'
import WavesSection from '@/components/sections/WavesSection'
import { SectionsFragment } from '@/services/graphql'

const SectionContent = ({ section }: { section: SectionsFragment }) => {
  switch (section.__typename) {
    case 'ComponentSectionsNarrowText':
      return <NarrowTextSection section={section} />

    case 'ComponentSectionsIconTitleDesc':
      return <IconTitleDescSection section={section} />

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
