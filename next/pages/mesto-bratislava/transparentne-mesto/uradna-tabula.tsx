import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  BasicSearch,
  DocumentCards,
  Footer,
  FooterProps,
  NoResultsFound,
  PageHeader,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import BasePageLayout from '../../../components/layouts/BasePageLayout'
import PageWrapper from '../../../components/layouts/PageWrapper'
import { pageStyle } from '../../../utils/page'
import { isPresent } from '../../../utils/utils'
import PageBreadcrumbs from '../../../components/molecules/PageBreadcrumbs'
import OfficialBoardBackgroundImage from '../../../assets/images/official-board.png'
import { AsyncServerProps } from '@utils/types'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { parseFooter, parseMainMenu } from '../../../utils/page'
import { useTranslation } from 'next-i18next'

export const getServerSideProps = async (ctx: any) => {
  const locale = ctx.locale ?? 'sk'
  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
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

const OfficialBoard = ({
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
  const menuItems = parseMainMenu(mainMenu?.filter(isPresent) ?? [])
  const { t } = useTranslation('common')

  const boardPage = {
    slug: 'mesto-bratislava/transparentne-mesto/official-board',
    title: t('officialBoard'),
    pageBackgroundImage: null,
    pageButtonContent: null,
    locale: 'sk',
    parentPage: {
      slug: 'mesto-bratislava/transparentne-mesto',
      locale: 'sk',
      title: t('transparentCity'),
      parentPage: {
        slug: 'mesto-bratislava',
        locale: 'sk',
        title: 'Mesto Bratislava',
      },
    },
    relatedBlogPosts: [],
  }

  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'mesto-bratislava/transparentne-mesto/uradna-tabula' },
        { locale: 'en', slug: 'city-of-bratislava/transparent-city/official-noticeboard' },
      ]}
    >
      <BasePageLayout footer={(footer && parseFooter(footer)) ?? undefined} menuItems={menuItems}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle('red'),
          }}
        />
        {/* Header */}
        <PageHeader
          color="var(--secondary-color)"
          transparentColor="var(--secondary-color--transparent)"
          transparentColorMobile="var(--secondary-color--semi-transparent)"
          imageSrc={OfficialBoardBackgroundImage.src}  className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="min-h-[220px] relative">
              <div className="absolute top-6">
                <PageBreadcrumbs page={boardPage} />
              </div>
              <h1 className="pt-30 text-md md:text-2xl font-bold whitespace-pre-wrap">{t('officialBoard')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="pt-14 md:pt-18">
          <BasicSearch
            className="pb-14 lg:pb-24"
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
          />
          {noResultsFound ? (
            <NoResultsFound
              title=""
              message="Ľutujeme, pre dané vyhľadávanie
            sa nenašli žiadne výsledky."
              messageClassName="max-w-sm text-center -mt-16 leading-normal"
            />
          ) : (
            <DocumentCards
              title={t('recentlyAddedDocuments')}
              viewButtonText={t('viewTheDocument')}
              downloadButtonText={t('download')}
              documents={documents}
            />
          )}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

const documents = [
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
  {
    title: 'Kúpna zmluva technológie garáže M. Benku',
    createdAt: 'utorok 19. decembra 2017',
    fileExtension: '.pdf',
    fileSize: '164 kB',
    content: 'Kúpna zmluva na technológie inštalované v podzemnej garáži na Nám. M. Benku od odovzdávajúceho nájomcu',
  },
]

export default OfficialBoard
