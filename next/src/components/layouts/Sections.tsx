import * as React from 'react'

import AccordionSection from '@/src/components/sections/AccordionSection'
import ArticlesSection from '@/src/components/sections/ArticlesSection/ArticlesSection'
import BannerSection from '@/src/components/sections/BannerSection'
import CalculatorSection from '@/src/components/sections/CalculatorSection_Deprecated/CalculatorSection_Deprecated'
import ColumnedTextSection from '@/src/components/sections/ColumnedTextSection'
import ColumnsSection from '@/src/components/sections/ColumnsSection'
import ComparisonSection from '@/src/components/sections/ComparisonSection'
import ContactsSection from '@/src/components/sections/ContactsSection'
import DividerSection from '@/src/components/sections/DividerSection'
import DocumentsSection from '@/src/components/sections/DocumentsSection/DocumentsSection'
import FaqCategoriesSection from '@/src/components/sections/FaqCategoriesSection'
import FaqsSection from '@/src/components/sections/FaqsSection'
import FileListSection from '@/src/components/sections/FileListSection'
import GallerySection from '@/src/components/sections/GallerySection'
import IframeSection from '@/src/components/sections/IframeSection'
import InbaArticlesListSection from '@/src/components/sections/InbaArticlesListSection'
import InbaReleasesSection from '@/src/components/sections/InbaReleasesSection'
import LinksSection from '@/src/components/sections/LinksSection'
import NarrowTextSection from '@/src/components/sections/NarrowTextSection'
import NumericalListSection from '@/src/components/sections/NumericalListSection'
import OfficialBoardSection from '@/src/components/sections/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from '@/src/components/sections/OrganizationalStructureSection'
import PartnersSection from '@/src/components/sections/PartnersSection'
import ProsAndConsSection from '@/src/components/sections/ProsAndConsSection'
import RegulationsListSection from '@/src/components/sections/RegulationsListSection'
import RegulationsSection from '@/src/components/sections/RegulationsSection'
import TextWithImageOverlappedSection from '@/src/components/sections/TextWithImageOverlappedSection'
import TextWithImageSection from '@/src/components/sections/TextWithImageSection'
import TootootEventsSection from '@/src/components/sections/TootootEventsSection'
import VideosSection from '@/src/components/sections/VideosSection'
import { SectionsFragment } from '@/src/services/graphql'

type SectionsProps = {
  sections: SectionsFragment[]
  className?: string
}

const SectionContent = ({ section }: { section: SectionsFragment }) => {
  // eslint-disable-next-line sonarjs/max-switch-cases
  switch (section.__typename) {
    case 'ComponentSectionsNarrowText':
      return <NarrowTextSection section={section} />

    case 'ComponentSectionsColumnedText':
      return <ColumnedTextSection section={section} />

    case 'ComponentSectionsColumns':
      return <ColumnsSection section={section} />

    case 'ComponentSectionsTextWithImage':
      return <TextWithImageSection section={section} />

    case 'ComponentSectionsTextWithImageOverlapped':
      return <TextWithImageOverlappedSection section={section} />

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

    case 'ComponentSectionsInbaArticlesList':
      return <InbaArticlesListSection section={section} />

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

    case 'ComponentSectionsContactsSection':
      return <ContactsSection section={section} />

    case 'ComponentSectionsRegulationsList':
      return <RegulationsListSection />

    case 'ComponentSectionsRegulations':
      return <RegulationsSection section={section} />

    case 'ComponentSectionsFaqs':
      return <FaqsSection section={section} />

    case 'ComponentSectionsFaqCategories':
      return <FaqCategoriesSection section={section} />

    case 'ComponentSectionsTootootEvents':
      return <TootootEventsSection section={section} />

    case 'ComponentSectionsPartners':
      return <PartnersSection section={section} />

    case 'ComponentSectionsDocuments':
      return <DocumentsSection section={section} />

    case 'ComponentSectionsNumericalList':
      return <NumericalListSection section={section} />

    default:
      return null
  }
}

const Sections = ({ sections, className }: SectionsProps) => {
  return (
    <div className={className}>
      {sections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SectionContent key={index} section={section} />
      ))}
    </div>
  )
}

export default Sections
