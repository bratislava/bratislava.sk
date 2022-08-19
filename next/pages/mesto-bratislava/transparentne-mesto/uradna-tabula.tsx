// @ts-strict-ignore
import {
  BasicSearch,
  DocumentCards,
  // Footer,
  // FooterProps,
  NoResultsFound,
  PageHeader,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { client } from 'backend/utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { AsyncServerProps } from '@utils/types'
import {
  getALotOfMockedDocs,
  getParsedUDEDocumentsList,
  ParsedOfficialBoardDocument,
  shouldMockGinis,
} from 'backend/services/ginis'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { client } from 'backend/utils/gql'
import { forceString } from '@utils/utils'

import OfficialBoardBackgroundImage from '../../../assets/images/official-board.png'
import BasePageLayout from '../../../components/layouts/BasePageLayout'
import PageWrapper from '../../../components/layouts/PageWrapper'
// import PageBreadcrumbs from '../../../components/molecules/PageBreadcrumbs'
import { pageStyle, parseFooter, parseMainMenu } from '../../../utils/page'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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

  const homepagePosts = homepage?.data?.attributes.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.data?.attributes?.url,
  }))

  const frontImage = homepage?.data?.attributes?.inba?.images?.frontImage?.data?.attributes?.url
  const rearImage = homepage?.data?.attributes?.inba?.images?.rearImage?.data?.attributes?.url
  const inba = {
    title: homepage?.data?.attributes?.inba?.title,
    content: homepage?.data?.attributes?.inba?.content,
    link: homepage?.data?.attributes?.inba?.link,
    images: [frontImage, rearImage],
  }

  const header = homepage?.data?.attributes?.header

  const cards = homepage?.data?.attributes?.cards?.map((card) => ({
    bookmarkTitle: card?.title,
    title: card?.headline,
    content: card?.text,
    link: {
      title: card?.link?.title,
      href: card?.link?.href,
    },
    icon: card?.picture?.data?.attributes?.url,
    variant: card?.variant,
  }))

  let documents: ParsedOfficialBoardDocument[] = []
  if (shouldMockGinis()) {
    documents = await getALotOfMockedDocs()
  } else {
    try {
      documents = await getParsedUDEDocumentsList(forceString(ctx?.query?.search))
    } catch (error) {
      console.log(error)
    }
  }

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
      footer,
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
      homepagePosts,
      documents,
      inba,
      header,
      cards,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const OfficialBoard = ({
  // data,
  footer,
  mainMenu,
  page,
  documents,
}: // homepage,
// latestBlogposts,
// homepagePosts,
// cards,
// header,
// inba,
AsyncServerProps<typeof getServerSideProps>) => {
  const noResultsFound = documents.length === 0
  const menuItems = parseMainMenu(mainMenu)
  const { t } = useTranslation('common')
  const { push, query } = useRouter()
  // const boardPage = {
  //   slug: 'mesto-bratislava/transparentne-mesto/official-board',
  //   title: t('officialBoard'),
  //   pageBackgroundImage: null,
  //   pageButtonContent: null,
  //   locale: 'sk',
  //   parentPage: {
  //     slug: 'mesto-bratislava/transparentne-mesto',
  //     locale: 'sk',
  //     title: t('transparentCity'),
  //     parentPage: {
  //       slug: 'mesto-bratislava',
  //       locale: 'sk',
  //       title: 'Mesto Bratislava',
  //     },
  //   },
  //   relatedBlogPosts: [],
  // }

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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: pageStyle('red'),
          }}
        />
        {/* Header */}
        <PageHeader
          color="var(--secondary-color)"
          transparentColor="var(--secondary-color--transparent)"
          transparentColorMobile="var(--secondary-color--semi-transparent)"
          imageSrc={OfficialBoardBackgroundImage}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="relative min-h-[220px]">
              <div className="absolute top-6">
                {/* <PageBreadcrumbs
                  parentPage={boardPage?.parentPage}
                  pageCategory={boardPage?.pageCategory}
                  title={boardPage.title}
                /> */}
              </div>
              <h1 className="whitespace-pre-wrap pt-30 text-md font-bold md:text-2xl">{t('officialBoard')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="pt-14 md:pt-18">
          <BasicSearch
            className="pb-14 lg:pb-24"
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
            /* TODO handle the fact push can error out */
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={(search) => push(`?search=${search}`)}
            initialValue={forceString(query?.search)}
          />
          {noResultsFound ? (
            <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
          ) : (
            <DocumentCards
              query={query?.search}
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

export default OfficialBoard
