import { SectionsFragment } from '@bratislava/strapi-sdk-homepage'
import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import * as React from 'react'

import AccordionSection from './sections/general/AccordionSection'
import ArticlesListSection from './sections/general/ArticlesListSection/ArticlesListSection'
import BannerBasicSection from './sections/general/BannerBasicSection'
import CalculatorSection from './sections/general/CalculatorSection/CalculatorSection'
import ColumnedTextSection from './sections/general/ColumnedTextSection'
import ContactSection from './sections/general/ContactSection'
import DividerSection from './sections/general/DividerSection'
import DocumentListSection from './sections/general/DocumentListSection/DocumentListSection'
import FileListSection from './sections/general/FileListSection'
import GallerySection from './sections/general/GallerySection'
import IconTitleDescSection from './sections/general/IconTitleDescSection'
import IframeSection from './sections/general/IframeSection'
import LinksSection from './sections/general/LinksSection'
import ListItemsSection from './sections/general/ListItemsSection'
import NarrowTextSection from './sections/general/NarrowTextSection'
import NewsletterSection from './sections/general/NewsletterSection'
import NumericalListSection from './sections/general/NumericalListSection'
import OfficialBoardSection from './sections/general/OfficialBoardSection/OfficialBoardSection'
import OrganizationalStructureSection from './sections/general/OrganizationalStructureSection'
import TextWithImageSection from './sections/general/TextWithImageSection'
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

    case 'ComponentSectionsContact':
      return <ContactSection section={section} />

    case 'ComponentSectionsAccordion':
      return <AccordionSection section={section} />

    case 'ComponentSectionsCalculator':
      return <CalculatorSection section={section} />

    case 'ComponentSectionsListItems':
      return <ListItemsSection section={section} />

    case 'ComponentSectionsNewsletter':
      return <NewsletterSection />

    case 'ComponentSectionsVideos':
      return <VideosSection section={section} />

    case 'ComponentSectionsArticlesList':
      return <ArticlesListSection section={section} />

    case 'ComponentSectionsOrganizationalStructure':
      return <OrganizationalStructureSection section={section} />

    case 'ComponentSectionsGallery':
      return <GallerySection section={section} />

    case 'ComponentSectionsIframe':
      return <IframeSection section={section} />

    case 'ComponentSectionsOfficialBoard':
      return <OfficialBoardSection />

    case 'ComponentSectionsBannerBasic':
      return <BannerBasicSection section={section} />

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

  // Not All sections has property hasBackground
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  const hasBackground = (section as any)?.hasBackground ?? false

  return (
    <SectionContainer
      className={cx('md:pt-18 pt-10', {
        'md:pb-18 bg-category-200 pb-14': hasBackground === true,
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
