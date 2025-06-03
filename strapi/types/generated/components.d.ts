import type { Attribute, Schema } from '@strapi/strapi'

export interface AccordionItemsFlatText extends Schema.Component {
  collectionName: 'components_accordion_items_flat_texts'
  info: {
    description: ''
    displayName: 'Flat Text'
    icon: 'adjust'
  }
  attributes: {
    align: Attribute.Enumeration<['left', 'center', 'right']>
    category: Attribute.String
    content: Attribute.RichText
    fileList: Attribute.Component<'blocks.file-item', true>
    moreLinkPage: Attribute.Relation<'accordion-items.flat-text', 'oneToOne', 'api::page.page'>
    moreLinkTitle: Attribute.String
    moreLinkUrl: Attribute.String
    width: Attribute.Enumeration<['narrow', 'default', 'wide', 'full']>
  }
}

export interface AccordionItemsInstitution extends Schema.Component {
  collectionName: 'components_accordion_items_institutions'
  info: {
    displayName: 'Institution'
  }
  attributes: {
    category: Attribute.String
    firstColumn: Attribute.RichText
    secondColumn: Attribute.RichText
    subtitle: Attribute.RichText
    thirdColumn: Attribute.RichText
    title: Attribute.String
    url: Attribute.String
    urlLabel: Attribute.String
  }
}

export interface AccordionItemsInstitutionNarrow extends Schema.Component {
  collectionName: 'components_sections_institution_narrows'
  info: {
    displayName: 'InstitutionNarrow'
    icon: 'ambulance'
  }
  attributes: {
    category: Attribute.String
    subtitle: Attribute.RichText
    title: Attribute.String
    url: Attribute.Text
    urlLabel: Attribute.String
  }
}

export interface BlocksColumnsItem extends Schema.Component {
  collectionName: 'components_blocks_columns_items'
  info: {
    displayName: 'columns item'
  }
  attributes: {
    image: Attribute.Media<'images'>
    text: Attribute.RichText
    title: Attribute.String
  }
}

export interface BlocksCommonLink extends Schema.Component {
  collectionName: 'components_blocks_common_links'
  info: {
    description: ''
    displayName: 'common link'
  }
  attributes: {
    analyticsId: Attribute.String
    article: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::article.article'>
    label: Attribute.String
    page: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::page.page'>
    url: Attribute.String
  }
}

export interface BlocksComparisonCard extends Schema.Component {
  collectionName: 'components_blocks_comparison_cards'
  info: {
    description: ''
    displayName: 'comparison card'
  }
  attributes: {
    iconMedia: Attribute.Media<'images'>
    items: Attribute.Component<'blocks.comparison-item', true> & Attribute.Required
    title: Attribute.String & Attribute.Required
  }
}

export interface BlocksComparisonItem extends Schema.Component {
  collectionName: 'components_blocks_comparison_items'
  info: {
    displayName: 'comparison item'
  }
  attributes: {
    label: Attribute.String & Attribute.Required
  }
}

export interface BlocksContactCard extends Schema.Component {
  collectionName: 'components_blocks_contact_cards'
  info: {
    description: ''
    displayName: 'Contact card'
  }
  attributes: {
    overrideLabel: Attribute.String
    value: Attribute.Text & Attribute.Required
  }
}

export interface BlocksContactPersonCard extends Schema.Component {
  collectionName: 'components_blocks_contact_person_cards'
  info: {
    displayName: 'contact person card'
  }
  attributes: {
    email: Attribute.Email
    phone: Attribute.String
    subtext: Attribute.String
    title: Attribute.String & Attribute.Required
  }
}

export interface BlocksFile extends Schema.Component {
  collectionName: 'components_blocks_files'
  info: {
    description: ''
    displayName: 'file'
    icon: 'archive'
  }
  attributes: {
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    title: Attribute.String
  }
}

export interface BlocksFileItem extends Schema.Component {
  collectionName: 'components_blocks_file_items'
  info: {
    description: ''
    displayName: 'file item'
  }
  attributes: {
    media: Attribute.Media<'images' | 'files'> & Attribute.Required
    title: Attribute.String
  }
}

export interface BlocksFooterColumn extends Schema.Component {
  collectionName: 'components_blocks_footer_column'
  info: {
    displayName: 'Footer Column'
  }
  attributes: {
    links: Attribute.Component<'blocks.common-link', true>
    title: Attribute.String & Attribute.Required
  }
}

export interface BlocksHomepageHighlightsItem extends Schema.Component {
  collectionName: 'components_blocks_homepage_highlights_items'
  info: {
    description: ''
    displayName: 'homepage highlights item'
  }
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required
    link: Attribute.Component<'blocks.common-link'> & Attribute.Required
  }
}

export interface BlocksIconWithTitleAndDescription extends Schema.Component {
  collectionName: 'components_blocks_icon_with_title_and_descriptions'
  info: {
    description: ''
    displayName: 'Icon With Title And Description'
  }
  attributes: {
    desc: Attribute.RichText
    disableIconBackground: Attribute.Boolean & Attribute.DefaultTo<false>
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    title: Attribute.String
  }
}

export interface BlocksInBa extends Schema.Component {
  collectionName: 'components_blocks_in_bas'
  info: {
    description: ''
    displayName: 'InBa'
    icon: 'asterisk'
  }
  attributes: {
    content: Attribute.String
    title: Attribute.String
  }
}

export interface BlocksNumericalListItem extends Schema.Component {
  collectionName: 'components_blocks_numerical_list_items'
  info: {
    description: ''
    displayName: 'Numerical List Item'
  }
  attributes: {
    text: Attribute.RichText
    title: Attribute.String & Attribute.Private
  }
}

export interface BlocksPageLink extends Schema.Component {
  collectionName: 'components_blocks_page_links'
  info: {
    description: ''
    displayName: 'page link'
  }
  attributes: {
    analyticsId: Attribute.String
    page: Attribute.Relation<'blocks.page-link', 'oneToOne', 'api::page.page'>
    title: Attribute.String
    url: Attribute.String
  }
}

export interface BlocksPartner extends Schema.Component {
  collectionName: 'components_blocks_partners'
  info: {
    displayName: 'partner'
  }
  attributes: {
    logo: Attribute.Media<'images'> & Attribute.Required
    title: Attribute.String & Attribute.Required
    url: Attribute.String
  }
}

export interface BlocksProsAndConsCard extends Schema.Component {
  collectionName: 'components_blocks_pros_and_cons_cards'
  info: {
    description: ''
    displayName: 'pros and cons card'
  }
  attributes: {
    items: Attribute.Component<'blocks.comparison-item', true> & Attribute.Required
    title: Attribute.String & Attribute.Required
  }
}

export interface BlocksTestimonialItem extends Schema.Component {
  collectionName: 'components_blocks_testimonial_items'
  info: {
    displayName: 'testimonial item'
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    quote: Attribute.Text & Attribute.Required
  }
}

export interface BlocksTimelineItem extends Schema.Component {
  collectionName: 'components_blocks_timeline_items'
  info: {
    description: ''
    displayName: 'Timeline item'
  }
  attributes: {
    content: Attribute.RichText
    title: Attribute.String
  }
}

export interface BlocksTopServicesItem extends Schema.Component {
  collectionName: 'components_blocks_top_services_items'
  info: {
    description: ''
    displayName: 'top services item'
  }
  attributes: {
    icon: Attribute.Enumeration<
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
        'prenajom_priestorov'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'bratislavske_konto'>
    link: Attribute.Component<'blocks.common-link'> & Attribute.Required
  }
}

export interface BlocksVideo extends Schema.Component {
  collectionName: 'components_blocks_videos'
  info: {
    displayName: 'Video'
  }
  attributes: {
    speaker: Attribute.String
    title: Attribute.String
    url: Attribute.String
  }
}

export interface GeneralHeader extends Schema.Component {
  collectionName: 'components_general_headers'
  info: {
    description: ''
    displayName: 'header'
  }
  attributes: {
    accountLink: Attribute.Component<'blocks.common-link'>
    links: Attribute.Component<'general.header-link', true>
  }
}

export interface GeneralHeaderLink extends Schema.Component {
  collectionName: 'components_general_header_links'
  info: {
    description: ''
    displayName: 'header link'
  }
  attributes: {
    analyticsId: Attribute.String
    icon: Attribute.Enumeration<['esluzby', 'kontakt', 'ukraina', 'som_turista']> &
      Attribute.Required &
      Attribute.DefaultTo<'kontakt'>
    label: Attribute.String
    page: Attribute.Relation<'general.header-link', 'oneToOne', 'api::page.page'>
    showOnDesktop: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    showOnMobile: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    url: Attribute.String
  }
}

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items'
  info: {
    description: ''
    displayName: 'menu item'
  }
  attributes: {
    icon: Attribute.Enumeration<
      [
        'mesto_01',
        'doprava_mapy_02',
        'zp_vystavba_03',
        'socialna_pomoc_04',
        'vzdelavanie_05',
        'kultura_06'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'mesto_01'>
    label: Attribute.Text & Attribute.Required
    page: Attribute.Relation<'menu.menu-item', 'oneToOne', 'api::page.page'>
    sections: Attribute.Component<'menu.menu-section', true>
  }
}

export interface MenuMenuLink extends Schema.Component {
  collectionName: 'components_menu_menu_links'
  info: {
    description: ''
    displayName: 'menu link'
  }
  attributes: {
    analyticsId: Attribute.String
    label: Attribute.String
    page: Attribute.Relation<'menu.menu-link', 'oneToOne', 'api::page.page'>
    url: Attribute.String
  }
}

export interface MenuMenuSection extends Schema.Component {
  collectionName: 'components_menu_menu_sections'
  info: {
    description: ''
    displayName: 'menu section'
  }
  attributes: {
    icon: Attribute.Enumeration<
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
        'covid_06'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'sprava_mesta_01'>
    label: Attribute.String & Attribute.Required
    links: Attribute.Component<'menu.menu-link', true>
    page: Attribute.Relation<'menu.menu-section', 'oneToOne', 'api::page.page'>
  }
}

export interface SectionsAccordion extends Schema.Component {
  collectionName: 'components_sections_accordions'
  info: {
    description: ''
    displayName: 'Accordion'
  }
  attributes: {
    flatText: Attribute.Component<'accordion-items.flat-text', true>
    institutions: Attribute.Component<'accordion-items.institution', true>
    institutionsNarrow: Attribute.Component<'accordion-items.institution-narrow', true>
    title: Attribute.String
  }
}

export interface SectionsArticles extends Schema.Component {
  collectionName: 'components_sections_articles'
  info: {
    description: ''
    displayName: 'Articles'
  }
  attributes: {
    category: Attribute.Relation<
      'sections.articles',
      'oneToOne',
      'api::page-category.page-category'
    >
    showAll: Attribute.Boolean & Attribute.DefaultTo<false>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsBanner extends Schema.Component {
  collectionName: 'components_sections_banners'
  info: {
    description: ''
    displayName: 'Banner'
  }
  attributes: {
    content: Attribute.Text
    contentPosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    media: Attribute.Media<'images'> & Attribute.Required
    primaryLink: Attribute.Component<'blocks.common-link'>
    secondaryLink: Attribute.Component<'blocks.common-link'>
    tertiaryLink: Attribute.Component<'blocks.common-link'>
    title: Attribute.String & Attribute.Required
    variant: Attribute.Enumeration<['color', 'dark', 'white_condensed']> &
      Attribute.Required &
      Attribute.DefaultTo<'color'>
  }
}

export interface SectionsCalculator extends Schema.Component {
  collectionName: 'components_sections_calculators'
  info: {
    displayName: 'Calculator'
  }
  attributes: {
    another_adult_value: Attribute.Decimal
    hasBackground: Attribute.Boolean
    child_value: Attribute.Decimal
    single_adult_value: Attribute.Decimal
  }
}

export interface SectionsColumnedText extends Schema.Component {
  collectionName: 'components_sections_columned_texts'
  info: {
    description: ''
    displayName: 'Columned Text'
  }
  attributes: {
    content: Attribute.RichText
    title: Attribute.String
  }
}

export interface SectionsColumns extends Schema.Component {
  collectionName: 'components_sections_columns'
  info: {
    description: ''
    displayName: 'Columns'
  }
  attributes: {
    columns: Attribute.Component<'blocks.columns-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    imageVariant: Attribute.Enumeration<
      [
        'columnsSection.imageVariant.withCircleBackground',
        'columnsSection.imageVariant.imageOriginalSize'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'columnsSection.imageVariant.withCircleBackground'>
    responsiveLayout: Attribute.Enumeration<
      ['columnsSection.responsiveLayout.slider', 'columnsSection.responsiveLayout.oneColumn']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'columnsSection.responsiveLayout.slider'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsComparisonSection extends Schema.Component {
  collectionName: 'components_sections_comparison_sections'
  info: {
    description: ''
    displayName: 'Comparison Section'
  }
  attributes: {
    cards: Attribute.Component<'blocks.comparison-card', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          max: 3
        },
        number
      >
    text: Attribute.Text
    textAlign: Attribute.Enumeration<['left', 'center']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    title: Attribute.String
  }
}

export interface SectionsContactsSection extends Schema.Component {
  collectionName: 'components_sections_contacts_sections'
  info: {
    description: ''
    displayName: 'Contacts section'
  }
  attributes: {
    addressContacts: Attribute.Component<'blocks.contact-card', true>
    description: Attribute.RichText
    emailContacts: Attribute.Component<'blocks.contact-card', true>
    hasBackground: Attribute.Boolean
    openingHoursContacts: Attribute.Component<'blocks.contact-card', true>
    personContacts: Attribute.Component<'blocks.contact-person-card', true>
    phoneContacts: Attribute.Component<'blocks.contact-card', true>
    title: Attribute.String
    type: Attribute.Enumeration<['horizontal', 'vertical']> &
      Attribute.Required &
      Attribute.DefaultTo<'horizontal'>
    webContacts: Attribute.Component<'blocks.contact-card', true>
  }
}

export interface SectionsDivider extends Schema.Component {
  collectionName: 'components_sections_dividers'
  info: {
    description: ''
    displayName: 'Divider'
  }
  attributes: {
    style: Attribute.Enumeration<
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
        'divadlo'
      ]
    >
  }
}

export interface SectionsFaqCategories extends Schema.Component {
  collectionName: 'components_sections_faq_categories'
  info: {
    displayName: 'FAQ categories'
  }
  attributes: {
    faqCategories: Attribute.Relation<
      'sections.faq-categories',
      'oneToMany',
      'api::faq-category.faq-category'
    >
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsFaqs extends Schema.Component {
  collectionName: 'components_sections_faqs'
  info: {
    description: ''
    displayName: 'FAQs'
  }
  attributes: {
    faqs: Attribute.Relation<'sections.faqs', 'oneToMany', 'api::faq.faq'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsFileList extends Schema.Component {
  collectionName: 'components_sections_file_lists'
  info: {
    description: ''
    displayName: 'File List'
  }
  attributes: {
    fileList: Attribute.Component<'blocks.file', true>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries'
  info: {
    description: ''
    displayName: 'Gallery'
    icon: 'camera'
  }
  attributes: {
    medias: Attribute.Media<'images', true> & Attribute.Required
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsHomepageEvents extends Schema.Component {
  collectionName: 'components_sections_homepage_events'
  info: {
    displayName: 'homepage events'
  }
  attributes: {
    eventsPageLink: Attribute.Component<'blocks.common-link'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsHomepageHighlights extends Schema.Component {
  collectionName: 'components_sections_homepage_highlights'
  info: {
    description: ''
    displayName: 'homepage highlights'
  }
  attributes: {
    cards: Attribute.Component<'blocks.homepage-highlights-item', true>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsHomepageMayorAndCouncil extends Schema.Component {
  collectionName: 'components_sections_homepage_mayor_and_councils'
  info: {
    displayName: 'homepage mayor and council'
  }
  attributes: {
    councilCard: Attribute.Component<'blocks.common-link'>
    mayorCard: Attribute.Component<'blocks.common-link'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsHomepageTabs extends Schema.Component {
  collectionName: 'components_sections_homepage_tabs'
  info: {
    description: ''
    displayName: 'homepage tabs'
  }
  attributes: {
    leftArticle: Attribute.Relation<'sections.homepage-tabs', 'oneToOne', 'api::article.article'>
    newsPageLink: Attribute.Component<'blocks.common-link'>
    officialBoardPageLink: Attribute.Component<'blocks.common-link'>
    rightArticle: Attribute.Relation<'sections.homepage-tabs', 'oneToOne', 'api::article.article'>
    roadClosuresPageLink: Attribute.Component<'blocks.common-link'>
  }
}

export interface SectionsIconTitleDesc extends Schema.Component {
  collectionName: 'components_sections_icon_title_descs'
  info: {
    description: ''
    displayName: 'Icon Title Desc'
  }
  attributes: {
    list: Attribute.Component<'blocks.icon-with-title-and-description', true>
    title: Attribute.String
  }
}

export interface SectionsIframe extends Schema.Component {
  collectionName: 'components_sections_iframes'
  info: {
    description: ''
    displayName: 'Iframe'
  }
  attributes: {
    allowFullscreen: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    allowGeolocation: Attribute.Boolean & Attribute.DefaultTo<false>
    css: Attribute.String
    fullHeight: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
    iframeHeight: Attribute.String & Attribute.Required & Attribute.DefaultTo<'600px'>
    iframeWidth: Attribute.Enumeration<['full', 'container']> &
      Attribute.Required &
      Attribute.DefaultTo<'container'>
    url: Attribute.String & Attribute.Required & Attribute.DefaultTo<'https://www.google.com'>
  }
}

export interface SectionsInbaArticlesList extends Schema.Component {
  collectionName: 'components_sections_inba_articles_lists'
  info: {
    description: ''
    displayName: 'in.ba articles'
  }
  attributes: {
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsInbaReleases extends Schema.Component {
  collectionName: 'components_sections_inba_releases'
  info: {
    displayName: 'in.ba releases'
  }
  attributes: {
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsLinks extends Schema.Component {
  collectionName: 'components_sections_links'
  info: {
    displayName: 'Links'
  }
  attributes: {
    pageLinks: Attribute.Component<'blocks.page-link', true>
    title: Attribute.String
  }
}

export interface SectionsNarrowText extends Schema.Component {
  collectionName: 'components_sections_narrow_texts'
  info: {
    displayName: 'Narrow Text'
  }
  attributes: {
    align: Attribute.Enumeration<['left', 'center', 'right']>
    content: Attribute.RichText
    width: Attribute.Enumeration<['narrow', 'default', 'wide', 'full']>
  }
}

export interface SectionsNumericalList extends Schema.Component {
  collectionName: 'components_sections_numerical_lists'
  info: {
    displayName: 'Numerical List'
  }
  attributes: {
    buttonLink: Attribute.String
    buttonText: Attribute.String
    items: Attribute.Component<'blocks.numerical-list-item', true>
    title: Attribute.String
    variant: Attribute.Enumeration<['basic', 'combined', 'roadmap']>
  }
}

export interface SectionsOfficialBoard extends Schema.Component {
  collectionName: 'components_sections_official_boards'
  info: {
    displayName: 'Official board'
  }
  attributes: {}
}

export interface SectionsOrganizationalStructure extends Schema.Component {
  collectionName: 'components_sections_organizational_structures'
  info: {
    description: ''
    displayName: 'Organizational structure'
    icon: 'address-book'
  }
  attributes: {
    title: Attribute.String
  }
}

export interface SectionsPartners extends Schema.Component {
  collectionName: 'components_sections_partners'
  info: {
    description: ''
    displayName: 'Partners'
  }
  attributes: {
    logoRatio: Attribute.Enumeration<['ratio 4:1', 'ratio 4:3']> &
      Attribute.Required &
      Attribute.DefaultTo<'ratio 4:1'>
    partners: Attribute.Component<'blocks.partner', true> & Attribute.Required
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsProsAndConsSection extends Schema.Component {
  collectionName: 'components_sections_pros_and_cons_sections'
  info: {
    description: ''
    displayName: 'Pros and Cons Section'
  }
  attributes: {
    cons: Attribute.Component<'blocks.pros-and-cons-card'> & Attribute.Required
    pros: Attribute.Component<'blocks.pros-and-cons-card'> & Attribute.Required
    text: Attribute.Text
    textAlign: Attribute.Enumeration<['left', 'center']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    title: Attribute.String
  }
}

export interface SectionsRegulations extends Schema.Component {
  collectionName: 'components_sections_regulations'
  info: {
    description: ''
    displayName: 'Regulations'
  }
  attributes: {
    regulations: Attribute.Relation<
      'sections.regulations',
      'oneToMany',
      'api::regulation.regulation'
    >
  }
}

export interface SectionsRegulationsList extends Schema.Component {
  collectionName: 'components_sections_regulations_lists'
  info: {
    description: ''
    displayName: 'Regulations list'
  }
  attributes: {}
}

export interface SectionsSubpageList extends Schema.Component {
  collectionName: 'components_sections_subpage_lists'
  info: {
    displayName: 'Subpage List'
  }
  attributes: {
    subpageList: Attribute.Component<'blocks.page-link', true>
  }
}

export interface SectionsTestimonials extends Schema.Component {
  collectionName: 'components_sections_testimonials'
  info: {
    description: ''
    displayName: 'Testimonials'
  }
  attributes: {
    hasBackground: Attribute.Boolean
    testimonials: Attribute.Component<'blocks.testimonial-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    text: Attribute.String
    title: Attribute.String
  }
}

export interface SectionsTextWithImage extends Schema.Component {
  collectionName: 'components_sections_text_with_images'
  info: {
    description: ''
    displayName: 'Text with Image'
  }
  attributes: {
    content: Attribute.RichText
    imageAspectRatio: Attribute.Enumeration<['ratio 1:1', 'ratio 4:3']> &
      Attribute.DefaultTo<'ratio 1:1'>
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required &
      Attribute.DefaultTo<'right'>
    imageSrc: Attribute.Media<'images'> & Attribute.Required
    links: Attribute.Component<'blocks.common-link', true> &
      Attribute.SetMinMax<
        {
          max: 2
        },
        number
      >
  }
}

export interface SectionsTextWithImageOverlapped extends Schema.Component {
  collectionName: 'components_sections_text_with_image_overlappeds'
  info: {
    description: ''
    displayName: 'Text with image overlapped'
  }
  attributes: {
    content: Attribute.RichText
    image: Attribute.Media<'images'> & Attribute.Required
    imagePosition: Attribute.Enumeration<['left', 'right', 'left shifted', 'right shifted']> &
      Attribute.Required &
      Attribute.DefaultTo<'right'>
    links: Attribute.Component<'blocks.common-link', true> &
      Attribute.SetMinMax<
        {
          max: 2
        },
        number
      >
  }
}

export interface SectionsTimeline extends Schema.Component {
  collectionName: 'components_sections_timelines'
  info: {
    description: ''
    displayName: 'Timeline'
  }
  attributes: {
    timelineItems: Attribute.Component<'blocks.timeline-item', true>
  }
}

export interface SectionsTootootEvents extends Schema.Component {
  collectionName: 'components_sections_tootoot_events'
  info: {
    description: ''
    displayName: 'Tootoot events'
  }
  attributes: {
    showMoreLink: Attribute.Component<'blocks.common-link'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsTopServices extends Schema.Component {
  collectionName: 'components_sections_top_services'
  info: {
    description: ''
    displayName: 'top services'
  }
  attributes: {
    services: Attribute.Component<'blocks.top-services-item', true> & Attribute.Required
    title: Attribute.String & Attribute.Required
  }
}

export interface SectionsVideos extends Schema.Component {
  collectionName: 'components_sections_videos'
  info: {
    description: ''
    displayName: 'Videos'
  }
  attributes: {
    subtitle: Attribute.String
    title: Attribute.String
    videos: Attribute.Component<'blocks.video', true>
  }
}

export interface SectionsWaves extends Schema.Component {
  collectionName: 'components_sections_waves'
  info: {
    displayName: 'Waves'
  }
  attributes: {
    position: Attribute.Enumeration<['top', 'bottom']>
  }
}

export interface TaxAdministratorsTaxAdministrator extends Schema.Component {
  collectionName: 'components_tax_administrators_tax_administrators'
  info: {
    description: ''
    displayName: 'Tax administrator'
  }
  attributes: {
    email: Attribute.Email & Attribute.Required
    name: Attribute.String & Attribute.Required
    officeNumber: Attribute.String & Attribute.Required
    phone: Attribute.String & Attribute.Required
    range: Attribute.String & Attribute.Required
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'accordion-items.flat-text': AccordionItemsFlatText
      'accordion-items.institution': AccordionItemsInstitution
      'accordion-items.institution-narrow': AccordionItemsInstitutionNarrow
      'blocks.columns-item': BlocksColumnsItem
      'blocks.common-link': BlocksCommonLink
      'blocks.comparison-card': BlocksComparisonCard
      'blocks.comparison-item': BlocksComparisonItem
      'blocks.contact-card': BlocksContactCard
      'blocks.contact-person-card': BlocksContactPersonCard
      'blocks.file': BlocksFile
      'blocks.file-item': BlocksFileItem
      'blocks.footer-column': BlocksFooterColumn
      'blocks.homepage-highlights-item': BlocksHomepageHighlightsItem
      'blocks.icon-with-title-and-description': BlocksIconWithTitleAndDescription
      'blocks.in-ba': BlocksInBa
      'blocks.numerical-list-item': BlocksNumericalListItem
      'blocks.page-link': BlocksPageLink
      'blocks.partner': BlocksPartner
      'blocks.pros-and-cons-card': BlocksProsAndConsCard
      'blocks.testimonial-item': BlocksTestimonialItem
      'blocks.timeline-item': BlocksTimelineItem
      'blocks.top-services-item': BlocksTopServicesItem
      'blocks.video': BlocksVideo
      'general.header': GeneralHeader
      'general.header-link': GeneralHeaderLink
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
      'sections.faq-categories': SectionsFaqCategories
      'sections.faqs': SectionsFaqs
      'sections.file-list': SectionsFileList
      'sections.gallery': SectionsGallery
      'sections.homepage-events': SectionsHomepageEvents
      'sections.homepage-highlights': SectionsHomepageHighlights
      'sections.homepage-mayor-and-council': SectionsHomepageMayorAndCouncil
      'sections.homepage-tabs': SectionsHomepageTabs
      'sections.icon-title-desc': SectionsIconTitleDesc
      'sections.iframe': SectionsIframe
      'sections.inba-articles-list': SectionsInbaArticlesList
      'sections.inba-releases': SectionsInbaReleases
      'sections.links': SectionsLinks
      'sections.narrow-text': SectionsNarrowText
      'sections.numerical-list': SectionsNumericalList
      'sections.official-board': SectionsOfficialBoard
      'sections.organizational-structure': SectionsOrganizationalStructure
      'sections.partners': SectionsPartners
      'sections.pros-and-cons-section': SectionsProsAndConsSection
      'sections.regulations': SectionsRegulations
      'sections.regulations-list': SectionsRegulationsList
      'sections.subpage-list': SectionsSubpageList
      'sections.testimonials': SectionsTestimonials
      'sections.text-with-image': SectionsTextWithImage
      'sections.text-with-image-overlapped': SectionsTextWithImageOverlapped
      'sections.timeline': SectionsTimeline
      'sections.tootoot-events': SectionsTootootEvents
      'sections.top-services': SectionsTopServices
      'sections.videos': SectionsVideos
      'sections.waves': SectionsWaves
      'tax-administrators.tax-administrator': TaxAdministratorsTaxAdministrator
    }
  }
}
