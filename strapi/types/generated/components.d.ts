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

export interface BlocksBlogPostLink extends Schema.Component {
  collectionName: 'components_blocks_blog_post_links'
  info: {
    displayName: 'blog Post Link'
    icon: 'anchor'
  }
  attributes: {
    blogPost: Attribute.Relation<'blocks.blog-post-link', 'oneToOne', 'api::blog-post.blog-post'>
    title: Attribute.String
    url: Attribute.String
  }
}

export interface BlocksBookmarkLink extends Schema.Component {
  collectionName: 'components_blocks_bookmark_links'
  info: {
    displayName: 'Bookmark Link'
    icon: 'award'
  }
  attributes: {
    href: Attribute.String
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
    blogPost: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::blog-post.blog-post'>
    label: Attribute.String & Attribute.Required
    page: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::page.page'>
    plausibleId: Attribute.String
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

export interface BlocksDocListExtensions extends Schema.Component {
  collectionName: 'components_blocks_doc_list_extensions'
  info: {
    displayName: 'DocListExtensions'
    icon: 'angle-right'
  }
  attributes: {
    document: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    title: Attribute.String
    validFrom: Attribute.Date
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

export interface BlocksFooterContactItem extends Schema.Component {
  collectionName: 'components_blocks_footer_contact_items'
  info: {
    description: ''
    displayName: 'footer contact item'
  }
  attributes: {
    label: Attribute.String & Attribute.Required
    mail: Attribute.Email
    phone: Attribute.String
  }
}

export interface BlocksFooterSection extends Schema.Component {
  collectionName: 'components_blocks_footer_sections'
  info: {
    displayName: 'footer Section'
    icon: 'align-center'
  }
  attributes: {
    pageLinks: Attribute.Component<'blocks.page-link', true>
    title: Attribute.String
  }
}

export interface BlocksGalleryItem extends Schema.Component {
  collectionName: 'components_blocks_gallery_items'
  info: {
    description: ''
    displayName: 'Gallery item'
  }
  attributes: {
    imgSubtext: Attribute.String
    imgSubtitle: Attribute.Text
    imgTitle: Attribute.Text
    media: Attribute.Media<'images'>
  }
}

export interface BlocksHomepageBookmark extends Schema.Component {
  collectionName: 'components_blocks_homepage_bookmarks'
  info: {
    displayName: 'Homepage Bookmark'
    icon: 'angle-double-left'
  }
  attributes: {
    headline: Attribute.String
    link: Attribute.Component<'blocks.bookmark-link'>
    picture: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    text: Attribute.String
    title: Attribute.String
    variant: Attribute.String
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
    displayName: 'page Link'
  }
  attributes: {
    anchor: Attribute.String
    page: Attribute.Relation<'blocks.page-link', 'oneToOne', 'api::page.page'>
    title: Attribute.String
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

export interface BlocksSpaceInfo extends Schema.Component {
  collectionName: 'components_blocks_space_infos'
  info: {
    displayName: 'spaceInfo'
  }
  attributes: {
    bigGapCapacity: Attribute.BigInteger
    buttonTitle: Attribute.String
    footerText: Attribute.String
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    imagePosition: Attribute.Enumeration<['left', 'right']>
    linkTitle: Attribute.String
    smallGapCapacity: Attribute.BigInteger
    spaceTitle: Attribute.String
    subText: Attribute.String
  }
}

export interface BlocksSubpage extends Schema.Component {
  collectionName: 'components_blocks_subpages'
  info: {
    displayName: 'Subpage'
    icon: 'atlas'
  }
  attributes: {
    link: Attribute.String
    title: Attribute.String
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
    displayName: 'header link'
  }
  attributes: {
    icon: Attribute.Enumeration<['esluzby', 'kontakt', 'ukraina', 'som_turista']> &
      Attribute.Required &
      Attribute.DefaultTo<'kontakt'>
    label: Attribute.String & Attribute.Required
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
    label: Attribute.String & Attribute.Required
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

export interface OsItemsAdvancedAccordionDepartment extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_departments'
  info: {
    displayName: 'Advanced Accordion Department'
    icon: 'list-alt'
  }
  attributes: {
    items: Attribute.Component<'os-items.advanced-accordion-sub-item', true>
    title: Attribute.String
  }
}

export interface OsItemsAdvancedAccordionItem extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_items'
  info: {
    description: ''
    displayName: 'Advanced Accordion Item'
    icon: 'align-justify'
  }
  attributes: {
    departments: Attribute.Component<'os-items.advanced-accordion-department', true>
    title: Attribute.String
  }
}

export interface OsItemsAdvancedAccordionSubItem extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_sub_items'
  info: {
    description: ''
    displayName: 'Advanced Accordion SubItem'
    icon: 'angle-down'
  }
  attributes: {
    isGroupTitle: Attribute.Boolean
    items: Attribute.Component<'os-items.advanced-accordion-sub-sub-item', true>
    title: Attribute.String
  }
}

export interface OsItemsAdvancedAccordionSubSubItem extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_sub_sub_items'
  info: {
    displayName: 'Advanced Accordion SubSubItem'
    icon: 'angle-double-down'
  }
  attributes: {
    title: Attribute.String
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
    hasBackground: Attribute.Boolean
    institutions: Attribute.Component<'accordion-items.institution', true>
    institutionsNarrow: Attribute.Component<'accordion-items.institution-narrow', true>
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

export interface SectionsBlogPostsByCategory extends Schema.Component {
  collectionName: 'components_sections_blog_posts_by_categories'
  info: {
    description: ''
    displayName: 'Blog posts by category'
  }
  attributes: {
    category: Attribute.Relation<
      'sections.blog-posts-by-category',
      'oneToOne',
      'api::page-category.page-category'
    >
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsBlogPostsByTags extends Schema.Component {
  collectionName: 'components_sections_blog_posts_by_tags'
  info: {
    displayName: 'Blog posts by tags'
  }
  attributes: {
    tags: Attribute.Relation<'sections.blog-posts-by-tags', 'oneToMany', 'api::tag.tag'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsBlogPostsList extends Schema.Component {
  collectionName: 'components_sections_blog_posts_lists'
  info: {
    description: ''
    displayName: 'Blog posts list'
  }
  attributes: {
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsCalculator extends Schema.Component {
  collectionName: 'components_sections_calculators'
  info: {
    displayName: 'Calculator'
  }
  attributes: {
    another_adult_value: Attribute.Decimal
    child_value: Attribute.Decimal
    hasBackground: Attribute.Boolean
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
    contentAlignment: Attribute.Enumeration<['left', 'center', 'right']> &
      Attribute.DefaultTo<'left'>
    hasBackground: Attribute.Boolean
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
    hasBackground: Attribute.Boolean
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
    displayName: 'faq categories'
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
    displayName: 'faqs'
  }
  attributes: {
    faqs: Attribute.Relation<'sections.faqs', 'oneToMany', 'api::faq.faq'>
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsFeaturedBlogPosts extends Schema.Component {
  collectionName: 'components_sections_featured_blog_posts'
  info: {
    displayName: 'Featured Blog Posts'
  }
  attributes: {
    first_blog: Attribute.Relation<
      'sections.featured-blog-posts',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    second_blog: Attribute.Relation<
      'sections.featured-blog-posts',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    third_blog: Attribute.Relation<
      'sections.featured-blog-posts',
      'oneToOne',
      'api::blog-post.blog-post'
    >
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
    galleryItems: Attribute.Component<'blocks.gallery-item', true>
    medias: Attribute.Media<'images', true> & Attribute.Required
    subtitle: Attribute.String
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
    leftNewsItem: Attribute.Relation<
      'sections.homepage-tabs',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    newsPageLink: Attribute.Component<'blocks.common-link'>
    officialBoardPageLink: Attribute.Component<'blocks.common-link'>
    rightNewsItem: Attribute.Relation<
      'sections.homepage-tabs',
      'oneToOne',
      'api::blog-post.blog-post'
    >
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
    hasBackground: Attribute.Boolean
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
    featuredArts: Attribute.Relation<
      'sections.inba-articles-list',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsInbaReleases extends Schema.Component {
  collectionName: 'components_sections_inba_releases'
  info: {
    displayName: 'inba releases'
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
    hasBackground: Attribute.Boolean
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
    hasBackground: Attribute.Boolean
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
    hasBackground: Attribute.Boolean
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
    displayName: 'Organizational structure'
    icon: 'address-book'
  }
  attributes: {
    items: Attribute.Component<'os-items.advanced-accordion-item', true>
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
  attributes: {
    text: Attribute.Text
    title: Attribute.String
  }
}

export interface SectionsSpace extends Schema.Component {
  collectionName: 'components_sections_spaces'
  info: {
    displayName: 'Space'
  }
  attributes: {
    sectionTitle: Attribute.String
    spaceInfo: Attribute.Component<'blocks.space-info', true>
  }
}

export interface SectionsSubpageList extends Schema.Component {
  collectionName: 'components_sections_subpage_lists'
  info: {
    displayName: 'Subpage List'
  }
  attributes: {
    hasBackground: Attribute.Boolean
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
    displayName: 'Text with Image'
  }
  attributes: {
    content: Attribute.RichText
    hasBackground: Attribute.Boolean
    imagePosition: Attribute.Enumeration<['left', 'right']>
    imageShadow: Attribute.Boolean
    imageSrc: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
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
      'blocks.blog-post-link': BlocksBlogPostLink
      'blocks.bookmark-link': BlocksBookmarkLink
      'blocks.common-link': BlocksCommonLink
      'blocks.comparison-card': BlocksComparisonCard
      'blocks.comparison-item': BlocksComparisonItem
      'blocks.contact-card': BlocksContactCard
      'blocks.doc-list-extensions': BlocksDocListExtensions
      'blocks.file': BlocksFile
      'blocks.file-item': BlocksFileItem
      'blocks.footer-column': BlocksFooterColumn
      'blocks.footer-contact-item': BlocksFooterContactItem
      'blocks.footer-section': BlocksFooterSection
      'blocks.gallery-item': BlocksGalleryItem
      'blocks.homepage-bookmark': BlocksHomepageBookmark
      'blocks.homepage-highlights-item': BlocksHomepageHighlightsItem
      'blocks.icon-with-title-and-description': BlocksIconWithTitleAndDescription
      'blocks.in-ba': BlocksInBa
      'blocks.numerical-list-item': BlocksNumericalListItem
      'blocks.page-link': BlocksPageLink
      'blocks.pros-and-cons-card': BlocksProsAndConsCard
      'blocks.space-info': BlocksSpaceInfo
      'blocks.subpage': BlocksSubpage
      'blocks.testimonial-item': BlocksTestimonialItem
      'blocks.timeline-item': BlocksTimelineItem
      'blocks.top-services-item': BlocksTopServicesItem
      'blocks.video': BlocksVideo
      'general.header': GeneralHeader
      'general.header-link': GeneralHeaderLink
      'menu.menu-item': MenuMenuItem
      'menu.menu-link': MenuMenuLink
      'menu.menu-section': MenuMenuSection
      'os-items.advanced-accordion-department': OsItemsAdvancedAccordionDepartment
      'os-items.advanced-accordion-item': OsItemsAdvancedAccordionItem
      'os-items.advanced-accordion-sub-item': OsItemsAdvancedAccordionSubItem
      'os-items.advanced-accordion-sub-sub-item': OsItemsAdvancedAccordionSubSubItem
      'sections.accordion': SectionsAccordion
      'sections.banner': SectionsBanner
      'sections.blog-posts-by-category': SectionsBlogPostsByCategory
      'sections.blog-posts-by-tags': SectionsBlogPostsByTags
      'sections.blog-posts-list': SectionsBlogPostsList
      'sections.calculator': SectionsCalculator
      'sections.columned-text': SectionsColumnedText
      'sections.comparison-section': SectionsComparisonSection
      'sections.contacts-section': SectionsContactsSection
      'sections.divider': SectionsDivider
      'sections.faq-categories': SectionsFaqCategories
      'sections.faqs': SectionsFaqs
      'sections.featured-blog-posts': SectionsFeaturedBlogPosts
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
      'sections.pros-and-cons-section': SectionsProsAndConsSection
      'sections.regulations': SectionsRegulations
      'sections.regulations-list': SectionsRegulationsList
      'sections.space': SectionsSpace
      'sections.subpage-list': SectionsSubpageList
      'sections.testimonials': SectionsTestimonials
      'sections.text-with-image': SectionsTextWithImage
      'sections.timeline': SectionsTimeline
      'sections.top-services': SectionsTopServices
      'sections.videos': SectionsVideos
      'sections.waves': SectionsWaves
      'tax-administrators.tax-administrator': TaxAdministratorsTaxAdministrator
    }
  }
}
