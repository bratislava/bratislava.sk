import type { Schema, Struct } from '@strapi/strapi'

export interface AccordionItemsFlatText extends Struct.ComponentSchema {
  collectionName: 'components_accordion_items_flat_texts'
  info: {
    description: ''
    displayName: 'Flat Text'
    icon: 'adjust'
  }
  attributes: {
    category: Schema.Attribute.String
    content: Schema.Attribute.RichText
    fileList: Schema.Attribute.Component<'blocks.file-item', true>
    moreLinkPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    moreLinkTitle: Schema.Attribute.String
    moreLinkUrl: Schema.Attribute.String
  }
}

export interface AccordionItemsInstitution extends Struct.ComponentSchema {
  collectionName: 'components_accordion_items_institutions'
  info: {
    displayName: 'Institution'
  }
  attributes: {
    category: Schema.Attribute.String
    firstColumn: Schema.Attribute.RichText
    secondColumn: Schema.Attribute.RichText
    subtitle: Schema.Attribute.RichText
    thirdColumn: Schema.Attribute.RichText
    title: Schema.Attribute.String
    url: Schema.Attribute.String
    urlLabel: Schema.Attribute.String
  }
}

export interface AccordionItemsInstitutionNarrow extends Struct.ComponentSchema {
  collectionName: 'components_sections_institution_narrows'
  info: {
    displayName: 'InstitutionNarrow'
    icon: 'ambulance'
  }
  attributes: {
    category: Schema.Attribute.String
    subtitle: Schema.Attribute.RichText
    title: Schema.Attribute.String
    url: Schema.Attribute.Text
    urlLabel: Schema.Attribute.String
  }
}

export interface BlocksCardLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_links'
  info: {
    displayName: 'card link'
  }
  attributes: {
    analyticsId: Schema.Attribute.String
    label: Schema.Attribute.String
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    subtext: Schema.Attribute.String
    url: Schema.Attribute.String
  }
}

export interface BlocksColumnsItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_columns_items'
  info: {
    displayName: 'columns item'
  }
  attributes: {
    image: Schema.Attribute.Media<'images'>
    text: Schema.Attribute.RichText
    title: Schema.Attribute.String
  }
}

export interface BlocksCommonLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_common_links'
  info: {
    description: ''
    displayName: 'common link'
  }
  attributes: {
    analyticsId: Schema.Attribute.String
    article: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>
    label: Schema.Attribute.String
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    url: Schema.Attribute.String
  }
}

export interface BlocksComparisonCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_comparison_cards'
  info: {
    description: ''
    displayName: 'comparison card'
  }
  attributes: {
    iconMedia: Schema.Attribute.Media<'images'>
    items: Schema.Attribute.Component<'blocks.comparison-item', true> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksComparisonItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_comparison_items'
  info: {
    displayName: 'comparison item'
  }
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksContactCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_cards'
  info: {
    description: ''
    displayName: 'Contact card'
  }
  attributes: {
    overrideLabel: Schema.Attribute.String
    value: Schema.Attribute.Text & Schema.Attribute.Required
  }
}

export interface BlocksContactDirectionsCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_directions_cards'
  info: {
    displayName: 'contact directions card'
  }
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required
    barrierFreeInfo: Schema.Attribute.Text
    iframeUrl: Schema.Attribute.String
    overrideLabel: Schema.Attribute.String
    parkingInfo: Schema.Attribute.Text
    publicTransportInfo: Schema.Attribute.Text
  }
}

export interface BlocksContactPersonCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_person_cards'
  info: {
    displayName: 'contact person card'
  }
  attributes: {
    email: Schema.Attribute.Email
    phone: Schema.Attribute.String
    subtext: Schema.Attribute.String
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksFile extends Struct.ComponentSchema {
  collectionName: 'components_blocks_files'
  info: {
    description: ''
    displayName: 'file'
    icon: 'archive'
  }
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    title: Schema.Attribute.String
  }
}

export interface BlocksFileItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_file_items'
  info: {
    description: ''
    displayName: 'file item'
  }
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required
    title: Schema.Attribute.String
  }
}

export interface BlocksFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footer_column'
  info: {
    displayName: 'Footer Column'
  }
  attributes: {
    links: Schema.Attribute.Component<'blocks.common-link', true>
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksHomepageHighlightsItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_homepage_highlights_items'
  info: {
    description: ''
    displayName: 'homepage highlights item'
  }
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required
    link: Schema.Attribute.Component<'blocks.common-link', false> & Schema.Attribute.Required
  }
}

export interface BlocksInBa extends Struct.ComponentSchema {
  collectionName: 'components_blocks_in_bas'
  info: {
    description: ''
    displayName: 'InBa'
    icon: 'asterisk'
  }
  attributes: {
    content: Schema.Attribute.String
    showMoreLink: Schema.Attribute.Component<'blocks.common-link', false>
    title: Schema.Attribute.String
  }
}

export interface BlocksNumbersOverviewItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_numbers_overview_items'
  info: {
    displayName: 'Numbers Overview Item'
  }
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required
    text: Schema.Attribute.Text & Schema.Attribute.Required
  }
}

export interface BlocksNumericalListItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_numerical_list_items'
  info: {
    description: ''
    displayName: 'Numerical List Item'
  }
  attributes: {
    text: Schema.Attribute.RichText
  }
}

export interface BlocksPageLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_page_links'
  info: {
    description: ''
    displayName: 'page link'
  }
  attributes: {
    analyticsId: Schema.Attribute.String
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    title: Schema.Attribute.String
    url: Schema.Attribute.String
  }
}

export interface BlocksPartner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partners'
  info: {
    displayName: 'partner'
  }
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
    url: Schema.Attribute.String
  }
}

export interface BlocksProsAndConsCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pros_and_cons_cards'
  info: {
    description: ''
    displayName: 'pros and cons card'
  }
  attributes: {
    items: Schema.Attribute.Component<'blocks.comparison-item', true> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface BlocksTopServicesItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_top_services_items'
  info: {
    description: ''
    displayName: 'top services item'
  }
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'bratislavske_konto',
        'dane_a_poplatky',
        'verejne_priestory',
        'nahlasenie_podnetov',
        'kampane_a_projekty',
        'turistom_v_hlavnom_meste',
        'organizacna_struktura',
        'uradne_hodiny',
        'pracovne_prilezitosti',
        'prenajom_priestorov',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'bratislavske_konto'>
    link: Schema.Attribute.Component<'blocks.common-link', false> & Schema.Attribute.Required
  }
}

export interface BlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_videos'
  info: {
    displayName: 'Video'
  }
  attributes: {
    speaker: Schema.Attribute.String
    title: Schema.Attribute.String
    url: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface GeneralHeader extends Struct.ComponentSchema {
  collectionName: 'components_general_headers'
  info: {
    description: ''
    displayName: 'header'
  }
  attributes: {
    accountLink: Schema.Attribute.Component<'blocks.common-link', false>
    links: Schema.Attribute.Component<'general.header-link', true>
  }
}

export interface GeneralHeaderLink extends Struct.ComponentSchema {
  collectionName: 'components_general_header_links'
  info: {
    description: ''
    displayName: 'header link'
  }
  attributes: {
    analyticsId: Schema.Attribute.String
    icon: Schema.Attribute.Enumeration<['esluzby', 'kontakt', 'ukraina', 'som_turista']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'kontakt'>
    label: Schema.Attribute.String
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    showOnDesktop: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>
    showOnMobile: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>
    url: Schema.Attribute.String
  }
}

export interface HeaderSectionsEvent extends Struct.ComponentSchema {
  collectionName: 'components_header_sections_events'
  info: {
    displayName: 'Event'
  }
  attributes: {
    address: Schema.Attribute.Text
    date: Schema.Attribute.Date
  }
}

export interface HeaderSectionsFacility extends Struct.ComponentSchema {
  collectionName: 'components_header_sections_facilities'
  info: {
    displayName: 'Facility'
  }
  attributes: {
    address: Schema.Attribute.Text
    media: Schema.Attribute.Media<'images' | 'files', true> & Schema.Attribute.Required
    navigateToLink: Schema.Attribute.String
  }
}

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items'
  info: {
    description: ''
    displayName: 'menu item'
  }
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'mesto_01',
        'doprava_mapy_02',
        'zp_vystavba_03',
        'socialna_pomoc_04',
        'vzdelavanie_05',
        'kultura_06',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'mesto_01'>
    label: Schema.Attribute.Text & Schema.Attribute.Required
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    sections: Schema.Attribute.Component<'menu.menu-section', true>
  }
}

export interface MenuMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_links'
  info: {
    description: ''
    displayName: 'menu link'
  }
  attributes: {
    analyticsId: Schema.Attribute.String
    label: Schema.Attribute.String
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    url: Schema.Attribute.String
  }
}

export interface MenuMenuSection extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_sections'
  info: {
    description: ''
    displayName: 'menu section'
  }
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'sprava_mesta_01',
        'transparentne_mesto_01',
        'dane_01',
        'projekty_01',
        'partnerstva_01',
        'mhd_02',
        'cyklo_02',
        'mapy_02',
        'sprava_a_udrzba_02',
        'doprava_02',
        'parkovanie_02',
        'zdielana_mobilita_02',
        'zivotne_prostredie_03',
        'zelen_03',
        'vystavba_a_nehnutelnosti_03',
        'uzemny_plan_03',
        'rozvoj_mesta_03',
        'verejne_osvetlenie_03',
        'klima_03',
        'byvanie_04',
        'sluzby_04',
        'zariadenia_04',
        'pomoc_04',
        'aktivity_04',
        'skolstvo_05',
        'sport_05',
        'deti_a_mladez_05',
        'ocenovanie_05',
        'dotacie_05',
        'kalendar_06',
        'organizacie_06',
        'dedicstvo_06',
        'sluzby_06',
        'koncepcia_06',
        'komunity_06',
        'covid_06',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sprava_mesta_01'>
    label: Schema.Attribute.String & Schema.Attribute.Required
    links: Schema.Attribute.Component<'menu.menu-link', true>
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface SectionsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_accordions'
  info: {
    description: ''
    displayName: 'Accordion'
  }
  attributes: {
    flatText: Schema.Attribute.Component<'accordion-items.flat-text', true>
    institutions: Schema.Attribute.Component<'accordion-items.institution', true>
    institutionsNarrow: Schema.Attribute.Component<'accordion-items.institution-narrow', true>
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsArticles extends Struct.ComponentSchema {
  collectionName: 'components_sections_articles'
  info: {
    description: ''
    displayName: 'Articles'
  }
  attributes: {
    adminGroups: Schema.Attribute.Relation<'oneToMany', 'api::admin-group.admin-group'>
    category: Schema.Attribute.Relation<'oneToOne', 'api::page-category.page-category'>
    showAll: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    showMoreLink: Schema.Attribute.Component<'blocks.common-link', false>
    tags: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_banners'
  info: {
    description: ''
    displayName: 'Banner'
  }
  attributes: {
    content: Schema.Attribute.Text
    contentPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required
    primaryLink: Schema.Attribute.Component<'blocks.common-link', false>
    secondaryLink: Schema.Attribute.Component<'blocks.common-link', false>
    tertiaryLink: Schema.Attribute.Component<'blocks.common-link', false>
    title: Schema.Attribute.String & Schema.Attribute.Required
    variant: Schema.Attribute.Enumeration<['color', 'dark', 'white_condensed']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'color'>
  }
}

export interface SectionsCalculator extends Struct.ComponentSchema {
  collectionName: 'components_sections_calculators'
  info: {
    description: ''
    displayName: 'Calculator'
  }
  attributes: {
    another_adult_value: Schema.Attribute.Decimal
    child_value: Schema.Attribute.Decimal
    single_adult_value: Schema.Attribute.Decimal
  }
}

export interface SectionsColumnedText extends Struct.ComponentSchema {
  collectionName: 'components_sections_columned_texts'
  info: {
    description: ''
    displayName: 'Columned Text'
  }
  attributes: {
    content: Schema.Attribute.RichText
    title: Schema.Attribute.String
  }
}

export interface SectionsColumns extends Struct.ComponentSchema {
  collectionName: 'components_sections_columns'
  info: {
    description: ''
    displayName: 'Columns'
  }
  attributes: {
    columns: Schema.Attribute.Component<'blocks.columns-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    imageVariant: Schema.Attribute.Enumeration<
      [
        'columnsSection.imageVariant.withCircleBackground',
        'columnsSection.imageVariant.imageOriginalSize',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'columnsSection.imageVariant.withCircleBackground'>
    responsiveLayout: Schema.Attribute.Enumeration<
      ['columnsSection.responsiveLayout.slider', 'columnsSection.responsiveLayout.oneColumn']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'columnsSection.responsiveLayout.slider'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsComparisonSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_comparison_sections'
  info: {
    description: ''
    displayName: 'Comparison Section'
  }
  attributes: {
    cards: Schema.Attribute.Component<'blocks.comparison-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3
        },
        number
      >
    text: Schema.Attribute.Text
    textAlign: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>
    title: Schema.Attribute.String
  }
}

export interface SectionsContactsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts_sections'
  info: {
    description: ''
    displayName: 'Contacts'
  }
  attributes: {
    addressContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    bankConnectionContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    billingInfoContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    description: Schema.Attribute.RichText
    directionsContact: Schema.Attribute.Component<'blocks.contact-directions-card', false>
    emailContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    openingHoursContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    personContacts: Schema.Attribute.Component<'blocks.contact-person-card', true>
    phoneContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    postalAddressContacts: Schema.Attribute.Component<'blocks.contact-card', true>
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
    webContacts: Schema.Attribute.Component<'blocks.contact-card', true>
  }
}

export interface SectionsDivider extends Struct.ComponentSchema {
  collectionName: 'components_sections_dividers'
  info: {
    description: ''
    displayName: 'Divider'
  }
  attributes: {
    style: Schema.Attribute.Enumeration<
      [
        'mesto_01_full_width',
        'hrad_01_full_width',
        'doprava_02_full_width',
        'parkovanie_02_full_width',
        'bicykel_02_full_width',
        'lod_02_full_width',
        'stromy_03_full_width',
        'vystavba_03_full_width',
        'park_04_full_width',
        'byvanie_04_full_width',
        'budovy_04_full_width',
        'vzdelavanie',
        'skola',
        'divadlo',
      ]
    >
  }
}

export interface SectionsDocuments extends Struct.ComponentSchema {
  collectionName: 'components_sections_documents'
  info: {
    description: ''
    displayName: 'Documents'
  }
  attributes: {
    documents: Schema.Attribute.Relation<'oneToMany', 'api::document.document'>
    showAll: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Dokumenty'>
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsEvents extends Struct.ComponentSchema {
  collectionName: 'components_sections_events'
  info: {
    displayName: 'Events'
  }
  attributes: {
    eventPages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsFacilities extends Struct.ComponentSchema {
  collectionName: 'components_sections_facilities'
  info: {
    displayName: 'Facilities'
  }
  attributes: {
    facilityPages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    text: Schema.Attribute.String
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsFaqCategories extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_categories'
  info: {
    displayName: 'FAQ categories'
  }
  attributes: {
    faqCategories: Schema.Attribute.Relation<'oneToMany', 'api::faq-category.faq-category'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsFaqs extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs'
  info: {
    description: ''
    displayName: 'FAQs'
  }
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsFileList extends Struct.ComponentSchema {
  collectionName: 'components_sections_file_lists'
  info: {
    description: ''
    displayName: 'File List'
  }
  attributes: {
    fileList: Schema.Attribute.Component<'blocks.file', true>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries'
  info: {
    description: ''
    displayName: 'Gallery'
    icon: 'camera'
  }
  attributes: {
    medias: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsHomepageEvents extends Struct.ComponentSchema {
  collectionName: 'components_sections_homepage_events'
  info: {
    displayName: 'homepage events'
  }
  attributes: {
    eventsPageLink: Schema.Attribute.Component<'blocks.common-link', false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsHomepageHighlights extends Struct.ComponentSchema {
  collectionName: 'components_sections_homepage_highlights'
  info: {
    description: ''
    displayName: 'homepage highlights'
  }
  attributes: {
    cards: Schema.Attribute.Component<'blocks.homepage-highlights-item', true>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsHomepageMayorAndCouncil extends Struct.ComponentSchema {
  collectionName: 'components_sections_homepage_mayor_and_councils'
  info: {
    displayName: 'homepage mayor and council'
  }
  attributes: {
    councilCard: Schema.Attribute.Component<'blocks.common-link', false>
    mayorCard: Schema.Attribute.Component<'blocks.common-link', false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsHomepageTabs extends Struct.ComponentSchema {
  collectionName: 'components_sections_homepage_tabs'
  info: {
    description: ''
    displayName: 'homepage tabs'
  }
  attributes: {
    leftArticle: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>
    newsPageLink: Schema.Attribute.Component<'blocks.common-link', false>
    officialBoardPageLink: Schema.Attribute.Component<'blocks.common-link', false>
    rightArticle: Schema.Attribute.Relation<'oneToOne', 'api::article.article'>
    roadClosuresPageLink: Schema.Attribute.Component<'blocks.common-link', false>
  }
}

export interface SectionsIframe extends Struct.ComponentSchema {
  collectionName: 'components_sections_iframes'
  info: {
    description: ''
    displayName: 'Iframe'
  }
  attributes: {
    allowFullscreen: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>
    allowGeolocation: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    css: Schema.Attribute.String
    fullHeight: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>
    iframeHeight: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'600px'>
    iframeWidth: Schema.Attribute.Enumeration<['full', 'container']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'container'>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://www.google.com'>
  }
}

export interface SectionsInbaArticlesList extends Struct.ComponentSchema {
  collectionName: 'components_sections_inba_articles_lists'
  info: {
    description: ''
    displayName: 'in.ba articles'
  }
  attributes: {
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsInbaReleases extends Struct.ComponentSchema {
  collectionName: 'components_sections_inba_releases'
  info: {
    displayName: 'in.ba releases'
  }
  attributes: {
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsLinks extends Struct.ComponentSchema {
  collectionName: 'components_sections_links'
  info: {
    displayName: 'Links'
  }
  attributes: {
    pageLinks: Schema.Attribute.Component<'blocks.page-link', true>
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsNarrowText extends Struct.ComponentSchema {
  collectionName: 'components_sections_narrow_texts'
  info: {
    displayName: 'Narrow Text'
  }
  attributes: {
    content: Schema.Attribute.RichText
    width: Schema.Attribute.Enumeration<['narrow', 'default', 'wide', 'full']> &
      Schema.Attribute.DefaultTo<'default'>
  }
}

export interface SectionsNumbersOverview extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbers_overviews'
  info: {
    displayName: 'Numbers Overview'
  }
  attributes: {
    numbersOverviewItems: Schema.Attribute.Component<'blocks.numbers-overview-item', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 4
          min: 1
        },
        number
      >
    showMoreLink: Schema.Attribute.Component<'blocks.common-link', false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsNumericalList extends Struct.ComponentSchema {
  collectionName: 'components_sections_numerical_lists'
  info: {
    displayName: 'Numerical List'
  }
  attributes: {
    items: Schema.Attribute.Component<'blocks.numerical-list-item', true>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    variant: Schema.Attribute.Enumeration<['basic', 'roadmap']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'basic'>
  }
}

export interface SectionsOfficialBoard extends Struct.ComponentSchema {
  collectionName: 'components_sections_official_boards'
  info: {
    displayName: 'Official board'
  }
  attributes: {}
}

export interface SectionsOrganizationalStructure extends Struct.ComponentSchema {
  collectionName: 'components_sections_organizational_structures'
  info: {
    description: ''
    displayName: 'Organizational structure'
    icon: 'address-book'
  }
  attributes: {
    title: Schema.Attribute.String
  }
}

export interface SectionsPartners extends Struct.ComponentSchema {
  collectionName: 'components_sections_partners'
  info: {
    description: ''
    displayName: 'Partners'
  }
  attributes: {
    logoRatio: Schema.Attribute.Enumeration<['ratio 4:1', 'ratio 4:3']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'ratio 4:1'>
    partners: Schema.Attribute.Component<'blocks.partner', true> & Schema.Attribute.Required
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
  }
}

export interface SectionsProsAndConsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_pros_and_cons_sections'
  info: {
    description: ''
    displayName: 'Pros and Cons Section'
  }
  attributes: {
    cons: Schema.Attribute.Component<'blocks.pros-and-cons-card', false> & Schema.Attribute.Required
    pros: Schema.Attribute.Component<'blocks.pros-and-cons-card', false> & Schema.Attribute.Required
    text: Schema.Attribute.Text
    textAlign: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>
    title: Schema.Attribute.String
  }
}

export interface SectionsRegulations extends Struct.ComponentSchema {
  collectionName: 'components_sections_regulations'
  info: {
    description: ''
    displayName: 'Regulations'
  }
  attributes: {
    regulations: Schema.Attribute.Relation<'oneToMany', 'api::regulation.regulation'>
    showAll: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
  }
}

export interface SectionsRegulationsList extends Struct.ComponentSchema {
  collectionName: 'components_sections_regulations_lists'
  info: {
    description: ''
    displayName: 'Regulations list'
  }
  attributes: {}
}

export interface SectionsSubnavigation extends Struct.ComponentSchema {
  collectionName: 'components_sections_subnavigations'
  info: {
    displayName: 'subnavigation'
  }
  attributes: {
    links: Schema.Attribute.Component<'blocks.card-link', true>
  }
}

export interface SectionsSubpageList extends Struct.ComponentSchema {
  collectionName: 'components_sections_subpage_lists'
  info: {
    displayName: 'Subpage List'
  }
  attributes: {
    subpageList: Schema.Attribute.Component<'blocks.page-link', true>
  }
}

export interface SectionsTextWithImage extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_with_images'
  info: {
    description: ''
    displayName: 'Text with Image'
  }
  attributes: {
    content: Schema.Attribute.RichText
    imageAspectRatio: Schema.Attribute.Enumeration<['ratio 1:1', 'ratio 4:3']> &
      Schema.Attribute.DefaultTo<'ratio 1:1'>
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'right'>
    imageSrc: Schema.Attribute.Media<'images'> & Schema.Attribute.Required
    links: Schema.Attribute.Component<'blocks.common-link', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2
        },
        number
      >
  }
}

export interface SectionsTextWithImageOverlapped extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_with_image_overlappeds'
  info: {
    description: ''
    displayName: 'Text with image overlapped'
  }
  attributes: {
    content: Schema.Attribute.RichText
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required
    imagePosition: Schema.Attribute.Enumeration<
      ['left', 'right', 'left shifted', 'right shifted']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'right'>
    links: Schema.Attribute.Component<'blocks.common-link', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2
        },
        number
      >
  }
}

export interface SectionsTootootEvents extends Struct.ComponentSchema {
  collectionName: 'components_sections_tootoot_events'
  info: {
    description: ''
    displayName: 'Tootoot events'
  }
  attributes: {
    showMoreLink: Schema.Attribute.Component<'blocks.common-link', false>
    text: Schema.Attribute.Text
    title: Schema.Attribute.String
  }
}

export interface SectionsTopServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_top_services'
  info: {
    description: ''
    displayName: 'top services'
  }
  attributes: {
    services: Schema.Attribute.Component<'blocks.top-services-item', true> &
      Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SectionsVideos extends Struct.ComponentSchema {
  collectionName: 'components_sections_videos'
  info: {
    description: ''
    displayName: 'Videos'
  }
  attributes: {
    subtitle: Schema.Attribute.Text
    title: Schema.Attribute.String
    titleLevel: Schema.Attribute.Enumeration<['h2', 'h3']> & Schema.Attribute.DefaultTo<'h2'>
    videos: Schema.Attribute.Component<'blocks.video', true>
  }
}

export interface SidebarsEmptySidebar extends Struct.ComponentSchema {
  collectionName: 'components_sidebars_empty_sidebars'
  info: {
    displayName: 'Pr\u00E1zdny sidebar'
  }
  attributes: {}
}

export interface TaxAdministratorsTaxAdministrator extends Struct.ComponentSchema {
  collectionName: 'components_tax_administrators_tax_administrators'
  info: {
    description: ''
    displayName: 'Tax administrator'
  }
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required
    name: Schema.Attribute.String & Schema.Attribute.Required
    officeNumber: Schema.Attribute.String & Schema.Attribute.Required
    phone: Schema.Attribute.String & Schema.Attribute.Required
    range: Schema.Attribute.String & Schema.Attribute.Required
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'accordion-items.flat-text': AccordionItemsFlatText
      'accordion-items.institution': AccordionItemsInstitution
      'accordion-items.institution-narrow': AccordionItemsInstitutionNarrow
      'blocks.card-link': BlocksCardLink
      'blocks.columns-item': BlocksColumnsItem
      'blocks.common-link': BlocksCommonLink
      'blocks.comparison-card': BlocksComparisonCard
      'blocks.comparison-item': BlocksComparisonItem
      'blocks.contact-card': BlocksContactCard
      'blocks.contact-directions-card': BlocksContactDirectionsCard
      'blocks.contact-person-card': BlocksContactPersonCard
      'blocks.file': BlocksFile
      'blocks.file-item': BlocksFileItem
      'blocks.footer-column': BlocksFooterColumn
      'blocks.homepage-highlights-item': BlocksHomepageHighlightsItem
      'blocks.in-ba': BlocksInBa
      'blocks.numbers-overview-item': BlocksNumbersOverviewItem
      'blocks.numerical-list-item': BlocksNumericalListItem
      'blocks.page-link': BlocksPageLink
      'blocks.partner': BlocksPartner
      'blocks.pros-and-cons-card': BlocksProsAndConsCard
      'blocks.top-services-item': BlocksTopServicesItem
      'blocks.video': BlocksVideo
      'general.header': GeneralHeader
      'general.header-link': GeneralHeaderLink
      'header-sections.event': HeaderSectionsEvent
      'header-sections.facility': HeaderSectionsFacility
      'menu.menu-item': MenuMenuItem
      'menu.menu-link': MenuMenuLink
      'menu.menu-section': MenuMenuSection
      'sections.accordion': SectionsAccordion
      'sections.articles': SectionsArticles
      'sections.banner': SectionsBanner
      'sections.calculator': SectionsCalculator
      'sections.columned-text': SectionsColumnedText
      'sections.columns': SectionsColumns
      'sections.comparison-section': SectionsComparisonSection
      'sections.contacts-section': SectionsContactsSection
      'sections.divider': SectionsDivider
      'sections.documents': SectionsDocuments
      'sections.events': SectionsEvents
      'sections.facilities': SectionsFacilities
      'sections.faq-categories': SectionsFaqCategories
      'sections.faqs': SectionsFaqs
      'sections.file-list': SectionsFileList
      'sections.gallery': SectionsGallery
      'sections.homepage-events': SectionsHomepageEvents
      'sections.homepage-highlights': SectionsHomepageHighlights
      'sections.homepage-mayor-and-council': SectionsHomepageMayorAndCouncil
      'sections.homepage-tabs': SectionsHomepageTabs
      'sections.iframe': SectionsIframe
      'sections.inba-articles-list': SectionsInbaArticlesList
      'sections.inba-releases': SectionsInbaReleases
      'sections.links': SectionsLinks
      'sections.narrow-text': SectionsNarrowText
      'sections.numbers-overview': SectionsNumbersOverview
      'sections.numerical-list': SectionsNumericalList
      'sections.official-board': SectionsOfficialBoard
      'sections.organizational-structure': SectionsOrganizationalStructure
      'sections.partners': SectionsPartners
      'sections.pros-and-cons-section': SectionsProsAndConsSection
      'sections.regulations': SectionsRegulations
      'sections.regulations-list': SectionsRegulationsList
      'sections.subnavigation': SectionsSubnavigation
      'sections.subpage-list': SectionsSubpageList
      'sections.text-with-image': SectionsTextWithImage
      'sections.text-with-image-overlapped': SectionsTextWithImageOverlapped
      'sections.tootoot-events': SectionsTootootEvents
      'sections.top-services': SectionsTopServices
      'sections.videos': SectionsVideos
      'sidebars.empty-sidebar': SidebarsEmptySidebar
      'tax-administrators.tax-administrator': TaxAdministratorsTaxAdministrator
    }
  }
}
