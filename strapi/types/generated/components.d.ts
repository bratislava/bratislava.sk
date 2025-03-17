import type { Schema, Attribute } from '@strapi/strapi'

export interface AccordionItemsFlatText extends Schema.Component {
  collectionName: 'components_accordion_items_flat_texts'
  info: {
    displayName: 'Flat Text'
    icon: 'adjust'
    description: ''
  }
  attributes: {
    category: Attribute.String
    content: Attribute.RichText
    width: Attribute.Enumeration<['narrow', 'default', 'wide', 'full']>
    align: Attribute.Enumeration<['left', 'center', 'right']>
    moreLinkTitle: Attribute.String
    moreLinkUrl: Attribute.String
    moreLinkPage: Attribute.Relation<'accordion-items.flat-text', 'oneToOne', 'api::page.page'>
    fileList: Attribute.Component<'blocks.file-item', true>
  }
}

export interface AccordionItemsInstitutionNarrow extends Schema.Component {
  collectionName: 'components_sections_institution_narrows'
  info: {
    displayName: 'InstitutionNarrow'
    icon: 'ambulance'
  }
  attributes: {
    title: Attribute.String
    subtitle: Attribute.RichText
    urlLabel: Attribute.String
    category: Attribute.String
    url: Attribute.Text
  }
}

export interface AccordionItemsInstitution extends Schema.Component {
  collectionName: 'components_accordion_items_institutions'
  info: {
    displayName: 'Institution'
  }
  attributes: {
    title: Attribute.String
    url: Attribute.String
    urlLabel: Attribute.String
    category: Attribute.String
    firstColumn: Attribute.RichText
    secondColumn: Attribute.RichText
    thirdColumn: Attribute.RichText
    subtitle: Attribute.RichText
  }
}

export interface BlocksBlogPostLink extends Schema.Component {
  collectionName: 'components_blocks_blog_post_links'
  info: {
    displayName: 'blog Post Link'
    icon: 'anchor'
  }
  attributes: {
    title: Attribute.String
    url: Attribute.String
    blogPost: Attribute.Relation<'blocks.blog-post-link', 'oneToOne', 'api::blog-post.blog-post'>
  }
}

export interface BlocksBookmarkLink extends Schema.Component {
  collectionName: 'components_blocks_bookmark_links'
  info: {
    displayName: 'Bookmark Link'
    icon: 'award'
  }
  attributes: {
    title: Attribute.String
    href: Attribute.String
  }
}

export interface BlocksCommonLink extends Schema.Component {
  collectionName: 'components_blocks_common_links'
  info: {
    displayName: 'common link'
    description: ''
  }
  attributes: {
    label: Attribute.String & Attribute.Required
    page: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::page.page'>
    blogPost: Attribute.Relation<'blocks.common-link', 'oneToOne', 'api::blog-post.blog-post'>
    url: Attribute.String
    plausibleId: Attribute.String
  }
}

export interface BlocksComparisonCard extends Schema.Component {
  collectionName: 'components_blocks_comparison_cards'
  info: {
    displayName: 'comparison card'
    description: ''
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    items: Attribute.Component<'blocks.comparison-item', true> & Attribute.Required
    iconMedia: Attribute.Media
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
    displayName: 'Contact card'
    description: ''
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
    title: Attribute.String
    document: Attribute.Media
    validFrom: Attribute.Date
  }
}

export interface BlocksFileItem extends Schema.Component {
  collectionName: 'components_blocks_file_items'
  info: {
    displayName: 'file item'
    description: ''
  }
  attributes: {
    title: Attribute.String
    media: Attribute.Media & Attribute.Required
  }
}

export interface BlocksFile extends Schema.Component {
  collectionName: 'components_blocks_files'
  info: {
    displayName: 'file'
    icon: 'archive'
    description: ''
  }
  attributes: {
    title: Attribute.String
    media: Attribute.Media
  }
}

export interface BlocksFooterColumn extends Schema.Component {
  collectionName: 'components_blocks_footer_column'
  info: {
    displayName: 'Footer Column'
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    links: Attribute.Component<'blocks.common-link', true>
  }
}

export interface BlocksFooterContactItem extends Schema.Component {
  collectionName: 'components_blocks_footer_contact_items'
  info: {
    displayName: 'footer contact item'
    description: ''
  }
  attributes: {
    label: Attribute.String & Attribute.Required
    phone: Attribute.String
    mail: Attribute.Email
  }
}

export interface BlocksFooterSection extends Schema.Component {
  collectionName: 'components_blocks_footer_sections'
  info: {
    displayName: 'footer Section'
    icon: 'align-center'
  }
  attributes: {
    title: Attribute.String
    pageLinks: Attribute.Component<'blocks.page-link', true>
  }
}

export interface BlocksGalleryItem extends Schema.Component {
  collectionName: 'components_blocks_gallery_items'
  info: {
    displayName: 'Gallery item'
    description: ''
  }
  attributes: {
    imgTitle: Attribute.Text
    imgSubtitle: Attribute.Text
    imgSubtext: Attribute.String
    media: Attribute.Media
  }
}

export interface BlocksHomepageBookmark extends Schema.Component {
  collectionName: 'components_blocks_homepage_bookmarks'
  info: {
    displayName: 'Homepage Bookmark'
    icon: 'angle-double-left'
  }
  attributes: {
    title: Attribute.String
    headline: Attribute.String
    text: Attribute.String
    link: Attribute.Component<'blocks.bookmark-link'>
    picture: Attribute.Media
    variant: Attribute.String
  }
}

export interface BlocksHomepageHighlightsItem extends Schema.Component {
  collectionName: 'components_blocks_homepage_highlights_items'
  info: {
    displayName: 'homepage highlights item'
    description: ''
  }
  attributes: {
    link: Attribute.Component<'blocks.common-link'> & Attribute.Required
    image: Attribute.Media & Attribute.Required
  }
}

export interface BlocksIconWithTitleAndDescription extends Schema.Component {
  collectionName: 'components_blocks_icon_with_title_and_descriptions'
  info: {
    displayName: 'Icon With Title And Description'
    description: ''
  }
  attributes: {
    title: Attribute.String
    desc: Attribute.RichText
    icon: Attribute.Media
    disableIconBackground: Attribute.Boolean & Attribute.DefaultTo<false>
  }
}

export interface BlocksInBa extends Schema.Component {
  collectionName: 'components_blocks_in_bas'
  info: {
    displayName: 'InBa'
    icon: 'asterisk'
    description: ''
  }
  attributes: {
    title: Attribute.String
    content: Attribute.String
  }
}

export interface BlocksNumericalListItem extends Schema.Component {
  collectionName: 'components_blocks_numerical_list_items'
  info: {
    displayName: 'Numerical List Item'
    description: ''
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
    title: Attribute.String
    url: Attribute.String
    anchor: Attribute.String
    page: Attribute.Relation<'blocks.page-link', 'oneToOne', 'api::page.page'>
  }
}

export interface BlocksProsAndConsCard extends Schema.Component {
  collectionName: 'components_blocks_pros_and_cons_cards'
  info: {
    displayName: 'pros and cons card'
    description: ''
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    items: Attribute.Component<'blocks.comparison-item', true> & Attribute.Required
  }
}

export interface BlocksSpaceInfo extends Schema.Component {
  collectionName: 'components_blocks_space_infos'
  info: {
    displayName: 'spaceInfo'
  }
  attributes: {
    imagePosition: Attribute.Enumeration<['left', 'right']>
    buttonTitle: Attribute.String
    footerText: Attribute.String
    smallGapCapacity: Attribute.BigInteger
    subText: Attribute.String
    bigGapCapacity: Attribute.BigInteger
    spaceTitle: Attribute.String
    image: Attribute.Media
    linkTitle: Attribute.String
  }
}

export interface BlocksSubpage extends Schema.Component {
  collectionName: 'components_blocks_subpages'
  info: {
    displayName: 'Subpage'
    icon: 'atlas'
  }
  attributes: {
    title: Attribute.String
    link: Attribute.String
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
    displayName: 'Timeline item'
    description: ''
  }
  attributes: {
    title: Attribute.String
    content: Attribute.RichText
  }
}

export interface BlocksTopServicesItem extends Schema.Component {
  collectionName: 'components_blocks_top_services_items'
  info: {
    displayName: 'top services item'
    description: ''
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
    title: Attribute.String
    speaker: Attribute.String
    url: Attribute.String
  }
}

export interface GeneralHeaderLink extends Schema.Component {
  collectionName: 'components_general_header_links'
  info: {
    displayName: 'header link'
  }
  attributes: {
    label: Attribute.String & Attribute.Required
    page: Attribute.Relation<'general.header-link', 'oneToOne', 'api::page.page'>
    url: Attribute.String
    showOnDesktop: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    showOnMobile: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    icon: Attribute.Enumeration<['esluzby', 'kontakt', 'ukraina', 'som_turista']> &
      Attribute.Required &
      Attribute.DefaultTo<'kontakt'>
  }
}

export interface GeneralHeader extends Schema.Component {
  collectionName: 'components_general_headers'
  info: {
    displayName: 'header'
    description: ''
  }
  attributes: {
    links: Attribute.Component<'general.header-link', true>
    accountLink: Attribute.Component<'blocks.common-link'>
  }
}

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items'
  info: {
    displayName: 'menu item'
    description: ''
  }
  attributes: {
    label: Attribute.Text & Attribute.Required
    page: Attribute.Relation<'menu.menu-item', 'oneToOne', 'api::page.page'>
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
    sections: Attribute.Component<'menu.menu-section', true>
  }
}

export interface MenuMenuLink extends Schema.Component {
  collectionName: 'components_menu_menu_links'
  info: {
    displayName: 'menu link'
    description: ''
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
    displayName: 'menu section'
    description: ''
  }
  attributes: {
    label: Attribute.String & Attribute.Required
    page: Attribute.Relation<'menu.menu-section', 'oneToOne', 'api::page.page'>
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
    links: Attribute.Component<'menu.menu-link', true>
  }
}

export interface OsItemsAdvancedAccordionDepartment extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_departments'
  info: {
    displayName: 'Advanced Accordion Department'
    icon: 'list-alt'
  }
  attributes: {
    title: Attribute.String
    items: Attribute.Component<'os-items.advanced-accordion-sub-item', true>
  }
}

export interface OsItemsAdvancedAccordionItem extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_items'
  info: {
    displayName: 'Advanced Accordion Item'
    icon: 'align-justify'
    description: ''
  }
  attributes: {
    title: Attribute.String
    departments: Attribute.Component<'os-items.advanced-accordion-department', true>
  }
}

export interface OsItemsAdvancedAccordionSubItem extends Schema.Component {
  collectionName: 'components_os_items_advanced_accordion_sub_items'
  info: {
    displayName: 'Advanced Accordion SubItem'
    icon: 'angle-down'
    description: ''
  }
  attributes: {
    title: Attribute.String
    isGroupTitle: Attribute.Boolean
    items: Attribute.Component<'os-items.advanced-accordion-sub-sub-item', true>
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
    displayName: 'Accordion'
    description: ''
  }
  attributes: {
    hasBackground: Attribute.Boolean
    institutions: Attribute.Component<'accordion-items.institution', true>
    flatText: Attribute.Component<'accordion-items.flat-text', true>
    institutionsNarrow: Attribute.Component<'accordion-items.institution-narrow', true>
    title: Attribute.String
  }
}

export interface SectionsBanner extends Schema.Component {
  collectionName: 'components_sections_banners'
  info: {
    displayName: 'Banner'
    description: ''
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    content: Attribute.Text
    contentPosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    variant: Attribute.Enumeration<['color', 'dark', 'white_condensed']> &
      Attribute.Required &
      Attribute.DefaultTo<'color'>
    media: Attribute.Media & Attribute.Required
    primaryLink: Attribute.Component<'blocks.common-link'>
    secondaryLink: Attribute.Component<'blocks.common-link'>
    tertiaryLink: Attribute.Component<'blocks.common-link'>
  }
}

export interface SectionsBlogPostsByCategory extends Schema.Component {
  collectionName: 'components_sections_blog_posts_by_categories'
  info: {
    displayName: 'Blog posts by category'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    category: Attribute.Relation<
      'sections.blog-posts-by-category',
      'oneToOne',
      'api::page-category.page-category'
    >
  }
}

export interface SectionsBlogPostsByTags extends Schema.Component {
  collectionName: 'components_sections_blog_posts_by_tags'
  info: {
    displayName: 'Blog posts by tags'
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    tags: Attribute.Relation<'sections.blog-posts-by-tags', 'oneToMany', 'api::tag.tag'>
  }
}

export interface SectionsBlogPostsList extends Schema.Component {
  collectionName: 'components_sections_blog_posts_lists'
  info: {
    displayName: 'Blog posts list'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
  }
}

export interface SectionsCalculator extends Schema.Component {
  collectionName: 'components_sections_calculators'
  info: {
    displayName: 'Calculator'
  }
  attributes: {
    single_adult_value: Attribute.Decimal
    another_adult_value: Attribute.Decimal
    child_value: Attribute.Decimal
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsColumnedText extends Schema.Component {
  collectionName: 'components_sections_columned_texts'
  info: {
    displayName: 'Columned Text'
    description: ''
  }
  attributes: {
    content: Attribute.RichText
    hasBackground: Attribute.Boolean
    contentAlignment: Attribute.Enumeration<['left', 'center', 'right']> &
      Attribute.DefaultTo<'left'>
  }
}

export interface SectionsComparisonSection extends Schema.Component {
  collectionName: 'components_sections_comparison_sections'
  info: {
    displayName: 'Comparison Section'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    textAlign: Attribute.Enumeration<['left', 'center']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    cards: Attribute.Component<'blocks.comparison-card', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        max: 3
      }>
  }
}

export interface SectionsContactsSection extends Schema.Component {
  collectionName: 'components_sections_contacts_sections'
  info: {
    displayName: 'Contacts section'
    description: ''
  }
  attributes: {
    title: Attribute.String
    description: Attribute.RichText
    hasBackground: Attribute.Boolean
    addressContacts: Attribute.Component<'blocks.contact-card', true>
    emailContacts: Attribute.Component<'blocks.contact-card', true>
    phoneContacts: Attribute.Component<'blocks.contact-card', true>
    webContacts: Attribute.Component<'blocks.contact-card', true>
    type: Attribute.Enumeration<['horizontal', 'vertical']> &
      Attribute.Required &
      Attribute.DefaultTo<'horizontal'>
  }
}

export interface SectionsDivider extends Schema.Component {
  collectionName: 'components_sections_dividers'
  info: {
    displayName: 'Divider'
    description: ''
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
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsFaqCategories extends Schema.Component {
  collectionName: 'components_sections_faq_categories'
  info: {
    displayName: 'faq categories'
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    faqCategories: Attribute.Relation<
      'sections.faq-categories',
      'oneToMany',
      'api::faq-category.faq-category'
    >
  }
}

export interface SectionsFaqs extends Schema.Component {
  collectionName: 'components_sections_faqs'
  info: {
    displayName: 'faqs'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    faqs: Attribute.Relation<'sections.faqs', 'oneToMany', 'api::faq.faq'>
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
    displayName: 'File List'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    fileList: Attribute.Component<'blocks.file', true>
  }
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries'
  info: {
    displayName: 'Gallery'
    icon: 'camera'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    subtitle: Attribute.String
    galleryItems: Attribute.Component<'blocks.gallery-item', true>
    medias: Attribute.Media & Attribute.Required
  }
}

export interface SectionsHomepageEvents extends Schema.Component {
  collectionName: 'components_sections_homepage_events'
  info: {
    displayName: 'homepage events'
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    eventsPageLink: Attribute.Component<'blocks.common-link'>
  }
}

export interface SectionsHomepageHighlights extends Schema.Component {
  collectionName: 'components_sections_homepage_highlights'
  info: {
    displayName: 'homepage highlights'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    cards: Attribute.Component<'blocks.homepage-highlights-item', true>
  }
}

export interface SectionsHomepageMayorAndCouncil extends Schema.Component {
  collectionName: 'components_sections_homepage_mayor_and_councils'
  info: {
    displayName: 'homepage mayor and council'
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    mayorCard: Attribute.Component<'blocks.common-link'>
    councilCard: Attribute.Component<'blocks.common-link'>
  }
}

export interface SectionsHomepageTabs extends Schema.Component {
  collectionName: 'components_sections_homepage_tabs'
  info: {
    displayName: 'homepage tabs'
    description: ''
  }
  attributes: {
    leftNewsItem: Attribute.Relation<
      'sections.homepage-tabs',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    rightNewsItem: Attribute.Relation<
      'sections.homepage-tabs',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    newsPageLink: Attribute.Component<'blocks.common-link'>
    officialBoardPageLink: Attribute.Component<'blocks.common-link'>
    roadClosuresPageLink: Attribute.Component<'blocks.common-link'>
  }
}

export interface SectionsIconTitleDesc extends Schema.Component {
  collectionName: 'components_sections_icon_title_descs'
  info: {
    displayName: 'Icon Title Desc'
    description: ''
  }
  attributes: {
    title: Attribute.String
    list: Attribute.Component<'blocks.icon-with-title-and-description', true>
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsIframe extends Schema.Component {
  collectionName: 'components_sections_iframes'
  info: {
    displayName: 'Iframe'
    description: ''
  }
  attributes: {
    url: Attribute.String & Attribute.Required & Attribute.DefaultTo<'https://www.google.com'>
    allowFullscreen: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>
    css: Attribute.String
    iframeWidth: Attribute.Enumeration<['full', 'container']> &
      Attribute.Required &
      Attribute.DefaultTo<'container'>
    iframeHeight: Attribute.String & Attribute.Required & Attribute.DefaultTo<'600px'>
    fullHeight: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
    allowGeolocation: Attribute.Boolean & Attribute.DefaultTo<false>
  }
}

export interface SectionsInbaArticlesList extends Schema.Component {
  collectionName: 'components_sections_inba_articles_lists'
  info: {
    displayName: 'in.ba articles'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    featuredArts: Attribute.Relation<
      'sections.inba-articles-list',
      'oneToMany',
      'api::inba-article.inba-article'
    >
  }
}

export interface SectionsInbaReleases extends Schema.Component {
  collectionName: 'components_sections_inba_releases'
  info: {
    displayName: 'inba releases'
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
  }
}

export interface SectionsLinks extends Schema.Component {
  collectionName: 'components_sections_links'
  info: {
    displayName: 'Links'
  }
  attributes: {
    title: Attribute.String
    pageLinks: Attribute.Component<'blocks.page-link', true>
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsNarrowText extends Schema.Component {
  collectionName: 'components_sections_narrow_texts'
  info: {
    displayName: 'Narrow Text'
  }
  attributes: {
    content: Attribute.RichText
    align: Attribute.Enumeration<['left', 'center', 'right']>
    width: Attribute.Enumeration<['narrow', 'default', 'wide', 'full']>
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsNumericalList extends Schema.Component {
  collectionName: 'components_sections_numerical_lists'
  info: {
    displayName: 'Numerical List'
  }
  attributes: {
    title: Attribute.String
    variant: Attribute.Enumeration<['basic', 'combined', 'roadmap']>
    buttonText: Attribute.String
    buttonLink: Attribute.String
    hasBackground: Attribute.Boolean
    items: Attribute.Component<'blocks.numerical-list-item', true>
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
    title: Attribute.String
    items: Attribute.Component<'os-items.advanced-accordion-item', true>
  }
}

export interface SectionsProsAndConsSection extends Schema.Component {
  collectionName: 'components_sections_pros_and_cons_sections'
  info: {
    displayName: 'Pros and Cons Section'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
    textAlign: Attribute.Enumeration<['left', 'center']> &
      Attribute.Required &
      Attribute.DefaultTo<'left'>
    pros: Attribute.Component<'blocks.pros-and-cons-card'> & Attribute.Required
    cons: Attribute.Component<'blocks.pros-and-cons-card'> & Attribute.Required
  }
}

export interface SectionsRegulationsList extends Schema.Component {
  collectionName: 'components_sections_regulations_lists'
  info: {
    displayName: 'Regulations list'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.Text
  }
}

export interface SectionsRegulations extends Schema.Component {
  collectionName: 'components_sections_regulations'
  info: {
    displayName: 'Regulations'
    description: ''
  }
  attributes: {
    regulations: Attribute.Relation<
      'sections.regulations',
      'oneToMany',
      'api::regulation.regulation'
    >
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
    subpageList: Attribute.Component<'blocks.page-link', true>
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsTestimonials extends Schema.Component {
  collectionName: 'components_sections_testimonials'
  info: {
    displayName: 'Testimonials'
    description: ''
  }
  attributes: {
    title: Attribute.String
    text: Attribute.String
    hasBackground: Attribute.Boolean
    testimonials: Attribute.Component<'blocks.testimonial-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }>
  }
}

export interface SectionsTextWithImage extends Schema.Component {
  collectionName: 'components_sections_text_with_images'
  info: {
    displayName: 'Text with Image'
  }
  attributes: {
    content: Attribute.RichText
    imageSrc: Attribute.Media
    imagePosition: Attribute.Enumeration<['left', 'right']>
    imageShadow: Attribute.Boolean
    hasBackground: Attribute.Boolean
  }
}

export interface SectionsTimeline extends Schema.Component {
  collectionName: 'components_sections_timelines'
  info: {
    displayName: 'Timeline'
    description: ''
  }
  attributes: {
    timelineItems: Attribute.Component<'blocks.timeline-item', true>
  }
}

export interface SectionsTopServices extends Schema.Component {
  collectionName: 'components_sections_top_services'
  info: {
    displayName: 'top services'
    description: ''
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    services: Attribute.Component<'blocks.top-services-item', true> & Attribute.Required
  }
}

export interface SectionsVideos extends Schema.Component {
  collectionName: 'components_sections_videos'
  info: {
    displayName: 'Videos'
    description: ''
  }
  attributes: {
    title: Attribute.String
    subtitle: Attribute.String
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
    displayName: 'Tax administrator'
    description: ''
  }
  attributes: {
    range: Attribute.String & Attribute.Required
    name: Attribute.String & Attribute.Required
    email: Attribute.Email & Attribute.Required
    phone: Attribute.String & Attribute.Required
    officeNumber: Attribute.String & Attribute.Required
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'accordion-items.flat-text': AccordionItemsFlatText
      'accordion-items.institution-narrow': AccordionItemsInstitutionNarrow
      'accordion-items.institution': AccordionItemsInstitution
      'blocks.blog-post-link': BlocksBlogPostLink
      'blocks.bookmark-link': BlocksBookmarkLink
      'blocks.common-link': BlocksCommonLink
      'blocks.comparison-card': BlocksComparisonCard
      'blocks.comparison-item': BlocksComparisonItem
      'blocks.contact-card': BlocksContactCard
      'blocks.doc-list-extensions': BlocksDocListExtensions
      'blocks.file-item': BlocksFileItem
      'blocks.file': BlocksFile
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
      'general.header-link': GeneralHeaderLink
      'general.header': GeneralHeader
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
      'sections.regulations-list': SectionsRegulationsList
      'sections.regulations': SectionsRegulations
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
