import * as React from 'react'

import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import AccordionSection from '@/src/components/sections/AccordionSection'
import ArticlesSection from '@/src/components/sections/ArticlesListSection/ArticlesSection'
import BlogPostsByCategory from '@/src/components/sections/ArticlesListSection/BlogPostsByCategory'
import BlogPostsList from '@/src/components/sections/ArticlesListSection/BlogPostsList'
import InbaArticlesList from '@/src/components/sections/ArticlesListSection/InbaArticlesList'
import BannerSection from '@/src/components/sections/BannerSection'
import CalculatorSection from '@/src/components/sections/CalculatorSection_Deprecated/CalculatorSection_Deprecated'
import ColumnedTextSection from '@/src/components/sections/ColumnedTextSection'
import ComparisonSection from '@/src/components/sections/ComparisonSection'
import ContactsSection from '@/src/components/sections/ContactsSection'
import DividerSection from '@/src/components/sections/DividerSection'
import FaqCategoriesSection from '@/src/components/sections/FaqCategoriesSection'
import FaqsSection from '@/src/components/sections/FaqsSection'
import FileListSection from '@/src/components/sections/FileListSection'
import GallerySection from '@/src/components/sections/GallerySection'
import IconTitleDescSection from '@/src/components/sections/IconTitleDescSection'
import IframeSection from '@/src/components/sections/IframeSection'
import InbaReleasesSection from '@/src/components/sections/InbaReleasesSection'
import LinksSection from '@/src/components/sections/LinksSection'
import NarrowTextSection from '@/src/components/sections/NarrowTextSection'
import NumericalListSection from '@/src/components/sections/NumericalListSection'
import OfficialBoardSection from '@/src/components/sections/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from '@/src/components/sections/OrganizationalStructureSection'
import ProsAndConsSection from '@/src/components/sections/ProsAndConsSection'
import RegulationsListSection from '@/src/components/sections/RegulationsListSection'
import RegulationsSection from '@/src/components/sections/RegulationsSection'
import TestimonialsSection from '@/src/components/sections/TestimonialsSection'
import TextWithImageSection from '@/src/components/sections/TextWithImageSection'
import TimelineSection from '@/src/components/sections/TimelineSection'
import VideosSection from '@/src/components/sections/VideosSection'
import WavesSection from '@/src/components/sections/WavesSection'
import { SectionsFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

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

    case 'ComponentSectionsArticles':
      return <ArticlesSection section={section} />

    case 'ComponentSectionsBlogPostsList':
      return <BlogPostsList section={section} />

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

    case 'ComponentSectionsContactsSection':
      return <ContactsSection section={section} />

    case 'ComponentSectionsRegulationsList':
      return <RegulationsListSection />

    case 'ComponentSectionsRegulations':
      return <RegulationsSection section={section} />

    case 'ComponentSectionsTestimonials':
      return <TestimonialsSection section={section} />

    case 'ComponentSectionsFaqs':
      return <FaqsSection section={section} />

    case 'ComponentSectionsFaqCategories':
      return <FaqCategoriesSection section={section} />

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
      className={cn('pt-10 md:pt-18', {
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
