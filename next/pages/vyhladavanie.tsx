// @ts-strict-ignore
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AdvancedSearch,
  BlogItem,
  FooterProps,
  PageHeader,
  SearchOptionProps,
  SearchResults,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
// import { buildMockData } from '@utils/homepage-mockdata'
import { AsyncServerProps } from '@utils/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { blogPostsFetcher, getBlogPostsSwrKey } from '../backend/utils/fetchers/blogPostsFetcher'
import { getPagesSwrKey, pagesFetcher } from '../backend/utils/fetchers/pagesFetcher'
import { userSearchFetcher } from '../backend/utils/organisationalStructure'
import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { PageCardProps } from '../components/ui/PageCard/PageCard'
import useGetSwrExtras from '../utils/useGetSwrExtras'

export interface SearchPageProps {
  page?: GeneralPageFragment
  footer: FooterProps
}

export const getServerSideProps = async (ctx: any) => {
  const keyword = ctx?.query?.keyword
  const locale = ctx.locale ?? 'sk'
  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  return {
    props: {
      footer,
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
      keyword: keyword ?? null,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const Search = ({ footer, mainMenu, page, keyword }: AsyncServerProps<typeof getServerSideProps>) => {
  const { t, i18n } = useTranslation('common')
  const menuItems = parseMainMenu(mainMenu)
  const options = [
    {
      key: 'articles',
      value: t('articles'),
    },
    { key: 'pages', value: t('pages') },
  ]
  const [checkedOptions, setCheckedOptions] = useState(options)
  const [input, setInput] = useState('')
  useEffect(() => {
    setInput(keyword)
  }, [keyword])

  const handleSelect = (innerOptions: SearchOptionProps[]) => {
    setCheckedOptions(innerOptions)
  }

  const pagesFilters = { search: keyword }
  const { data: dataPages, error: errorPages } = useSWR(
    getPagesSwrKey(pagesFilters, i18n.language),
    pagesFetcher(pagesFilters, i18n.language)
  )
  const { dataToDisplay: pagesToDisplay, loadingAndNoDataToDisplay: loadingAndNoPagesToDisplay } = useGetSwrExtras({
    data: dataPages,
    error: errorPages,
  })

  const blogPostsFilters = { search: keyword, page: 1, pageSize: 10 }
  const { data: dataBlogPosts, error: errorBlogPosts } = useSWR(
    getBlogPostsSwrKey(blogPostsFilters, i18n.language),
    blogPostsFetcher(blogPostsFilters, i18n.language)
  )
  const { dataToDisplay: blogPostsToDisplay, loadingAndNoDataToDisplay: loadingAndNoBlogPostsToDisplay } =
    useGetSwrExtras({
      data: dataBlogPosts,
      error: errorBlogPosts,
    })

  const { data: dataUsers, error: errorUsers } = useSWR(['Users', keyword], () => userSearchFetcher(keyword))
  const { dataToDisplay: usersToDisplay, loadingAndNoDataToDisplay: loadingAndNoUsersToDisplay } = useGetSwrExtras({
    data: dataUsers,
    error: errorUsers,
  })

  console.log(dataPages?.hits)

  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'vyhladavanie' },
        { locale: 'en', slug: 'search' },
      ]}
      slug="/vyhladavanie"
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
          imageSrc=""
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="relative min-h-[220px]">
              <h1 className="text-h1 pt-30 whitespace-pre-wrap">{t('searchTheSite')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="md:pt-18 flex w-full gap-y-14 pt-14 lg:gap-y-24">
          <AdvancedSearch
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
            handleSelect={handleSelect}
            keyword={input}
          />
          <SearchResults
            checkedOptions={checkedOptions}
            pagesResult={loadingAndNoPagesToDisplay ? [] : (pagesToDisplay.hits as PageCardProps[])}
            blogPostsResult={loadingAndNoBlogPostsToDisplay ? [] : blogPostsToDisplay.hits}
            usersResult={loadingAndNoUsersToDisplay ? [] : usersToDisplay}
          />
          {/* TODO : commented newsletter for this release probably on future release we will uncomment */}
          {/* <NewsLetterSection /> */}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default Search
