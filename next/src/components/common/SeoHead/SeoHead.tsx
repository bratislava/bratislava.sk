import Head from 'next/head'

import { UploadImageEntityFragment } from '@/src/services/graphql'

const TITLE_POSTFIX = 'Mesto Bratislava'
const META_TITLE_POSTFIX = 'Mesto Bratislava'
const OG_TITLE_POSTFIX = 'Mesto Bratislava'
const OG_SITE_NAME = 'Hlavné mesto SR Bratislava'

type SeoHeadProps = {
  title: string | undefined | null
  seo?: any | null | undefined // TODO replace any by SeoFragment when implemented
  ogType?: string
  description?: string | null
  keywords?: string | null
  image?: UploadImageEntityFragment | null
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/0c3319a00399050bd69d4921a2c93837e147e7e4/next/src/components/common/SeoHead/SeoHead.tsx#L11
 *
 * TODO
 *  - full paths
 *  - seo component
 *  - better usage with SEO strapi plugin
 */

const SeoHead = ({
  title,
  seo,
  ogType = 'website',
  description,
  keywords,
  image,
}: SeoHeadProps) => {
  // TODO
  // const { getFullPath } = useGetFullPath()
  // const fullPath = getFullPath(entity)
  // const fullPathWithDomain = isHomepage
  //   ? `https://bratislava.sk/`
  //   : fullPath
  //     ? `https://bratislava.sk${fullPath}`
  //     : null

  return (
    <Head>
      <title>{`${title || ''} – ${TITLE_POSTFIX}`}</title>

      <meta name="title" content={`${seo?.metaTitle || title || ''} – ${META_TITLE_POSTFIX}`} />
      <meta name="description" content={seo?.metaDescription || description || ''} />
      <meta name="keywords" content={seo?.keywords || keywords || ''} />
      <meta name="viewport" content={seo?.metaViewport ?? 'width=device-width, initial-scale=1'} />

      {/* {fullPathWithDomain && <link rel="canonical" href={fullPathWithDomain} />} */}

      {/* Documentation: https://ogp.me/ */}
      <meta
        property="og:title"
        content={`${seo?.metaTitle || title || ''} – ${OG_TITLE_POSTFIX}`}
      />
      <meta property="og:type" content={ogType} />
      {/* {fullPathWithDomain && <meta property="og:url" content={fullPathWithDomain} />} */}

      {/* TODO: Twitter's image size limit is only 1MB */}
      <meta property="og:image" content={image?.url ?? ''} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Comments from: https://css-tricks.com/essential-meta-tags-social-media/ */}
      {/* Non-Essential, But Recommended */}
      <meta property="og:description" content={seo?.metaDescription || description || ''} />
      <meta property="og:site_name" content={OG_SITE_NAME} />
      <meta name="twitter:image:alt" content={image?.alternativeText ?? ''} />

      {/* Non-Essential, But Required for Analytics */}
      {/* <meta property="fb:app_id" content="your_app_id" /> */}
      {/* <meta name="twitter:site" content="@website-username" /> */}
    </Head>
  )
}

export default SeoHead
