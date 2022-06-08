import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AdvancedSearch,
  BlogSearchCards,
  FileList,
  Footer,
  FooterProps,
  NoResultsFound,
  PageCards,
  PageHeader,
} from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle } from '../utils/page'
import { isPresent } from '../utils/utils'
import { AsyncServerProps } from '@utils/types'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { parseMainMenu } from '../utils/page'

export interface SearchPageProps {
  page?: GeneralPageFragment
  footer: FooterProps
}

export const getServerSideProps = async (ctx: any) => {
  const locale = ctx.locale ?? 'sk'
  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'published_at:DESC',
  })

  const { homepage } = await client.Homepage({
    locale,
  })

  const homepagePosts = homepage?.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.url,
  }))

  const frontImage = homepage?.inba?.images?.frontImage?.url
  const rearImage = homepage?.inba?.images?.rearImage?.url
  const inba = {
    title: homepage?.inba?.title,
    content: homepage?.inba?.content,
    link: homepage?.inba?.link,
    images: [frontImage, rearImage],
  }

  const header = homepage?.header

  const cards = homepage?.cards?.map((card) => ({
    bookmarkTitle: card?.title,
    title: card?.headline,
    content: card?.text,
    link: {
      title: card?.link?.title,
      href: card?.link?.href,
    },
    icon: card?.picture?.url,
    variant: card?.variant,
  }))

  return {
    props: {
      data: buildMockData({
        inBaImage1: '/inba1.jpeg',
        inBaImage2: '/inba2.png',
        postImage1: '/sample-blog-image.png',
        postImage2: '/sample-news-image.jpeg',
        postImage3: '/viz2-1024x690.jpeg',
        newsImage1: '/sample-news-image.jpeg',
        newsImage2: '/sample-news-image-2.jpeg',
        primatorImage: '/primatorReal.png',
        councilImage: '/BACoatOfArms.svg',
        locale,
      }),
      footer: footer,
      latestBlogposts: blogPosts,
      homepage,
      mainMenu,
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      homepagePosts: homepagePosts,
      inba: inba,
      header: header,
      cards: cards,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const Search = ({
  data,
  footer,
  mainMenu,
  page,
  homepage,
  latestBlogposts,
  homepagePosts,
  cards,
  header,
  inba,
}: AsyncServerProps<typeof getServerSideProps>) => {
  const noResultsFound = false
  const { t } = useTranslation('common')
  const menuItems = parseMainMenu(mainMenu?.filter(isPresent) ?? [])

  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'vyhladavanie' },
        { locale: 'en', slug: 'search' },
      ]}
      slug={'/vyhladavanie'}
    >
      <BasePageLayout {...footer} menuItems={menuItems}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle('red'),
          }}
        />
        {/* Header */}
        <PageHeader color="var(--secondary-color)" transparentColor="var(--secondary-color--transparent)" imageSrc={''}>
          {/* Header - Breadcrumbs */}
          <h1 className="flex justify-center lg:justify-start pl-0 lg:pl-8 xl:pl-41 py-18 text-md md:text-2xl font-bold whitespace-pre-wrap max-w-screen-1.5lg">
            {t('searchTheSite')}
          </h1>
        </PageHeader>

        <div className="flex flex-col px-8 xl:px-41 py-14 xl:py-24 gap-y-14 xl:gap-y-24">
          <AdvancedSearch
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
            options={[t('articles'), t('pages'), t('documents')]}
          />
          {noResultsFound ? (
            <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
          ) : (
            <>
              <BlogSearchCards title={t('articles')} blogs={blogs} />
              <PageCards title={t('websites')} pages={pages} />
              <div className="flex flex-col gap-y-3 lg:gap-y-6">
                <div className="text-default lg:text-md font-semibold">{t('documents')}</div>
                <FileList fileSections={fileSections} hideCategory />
              </div>
            </>
          )}
          {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
          {/* <NewsLetterSection /> */}
          <Footer />
        </div>
      </BasePageLayout>
    </PageWrapper>
  )
}

const fileSections = [
  {
    category: 'Category 1',
    files: [
      {
        title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
        media: {
          url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
          created_at: 'máj 2021',
          ext: '.pdf',
          size: 1.6,
        },
      },
      {
        title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
        media: {
          url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
          created_at: 'máj 2021',
          ext: '.pdf',
          size: 1.6,
        },
      },
      {
        title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
        media: {
          url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
          created_at: 'máj 2021',
          ext: '.pdf',
          size: 1.6,
        },
      },
      {
        title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
        media: {
          url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
          created_at: 'máj 2021',
          ext: '.pdf',
          size: 1.6,
        },
      },
      {
        title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
        media: {
          url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
          created_at: 'máj 2021',
          ext: '.pdf',
          size: 1.6,
        },
      },
    ],
  },
]

const blogs = [
  {
    title: 'Výsledky výberového konania na pozíciu náčelníka Mestskej polície',
    published_at: '2022-04-05T14:12:11.528Z',
    coverImage: {
      url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/44654929_1094813014012650_2908887100818456576_n_2f821d87a4.png',
    },
    tag: {
      pageCategory: {
        color: 'red',
        shortTitle: 'Mesto Bratislava',
      },
    },
  },
  {
    title: 'Z decembrového zasadnutia mestského zastupiteľstva',
    published_at: '2022-04-01T13:45:34.674Z',
    coverImage: {
      url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/byvanie_byty_mesto_1_ce32380a06.jpg',
    },
    tag: {
      pageCategory: {
        color: 'red',
        shortTitle: 'Mesto Bratislava',
      },
    },
  },
  {
    title: 'Mesto spustilo výstavbu predĺženia električkovej trate v Petržalke',
    published_at: '2022-03-31T14:04:00.362Z',
    coverImage: {
      url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/zrkadlovy_haj_1_89323aa8f8.jpg',
    },
    tag: {
      pageCategory: null,
    },
  },
]

const pages = [
  {
    pageColor: 'red',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pageColor: 'blue',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pageColor: 'green',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pageColor: 'yellow',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pageColor: 'purple',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    pageColor: 'brown',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

export default Search
