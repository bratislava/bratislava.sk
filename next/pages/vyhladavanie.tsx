// @ts-strict-ignore
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import { AdvancedSearch, FooterProps, PageHeader, SearchOptionProps, SectionContainer } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'

import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import BlogPostsResults from '../components/molecules/SearchPage/BlogPostsResults'
import PagesResults from '../components/molecules/SearchPage/PagesResults'
import UsersResults from '../components/molecules/SearchPage/UsersResults'

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
  const { t } = useTranslation('common')
  const menuItems = parseMainMenu(mainMenu)

  const [input, setInput] = useState('')

  const defaultOptions = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
  ]
  const [checkedOptions, setCheckedOptions] = useState(defaultOptions)

  const blogPostsSelected = checkedOptions.some(({ key }) => key === 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key === 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key === 'users')

  useEffect(() => {
    setInput(keyword)
  }, [keyword])

  const handleSelect = (innerOptions: SearchOptionProps[]) => {
    setCheckedOptions(innerOptions)
  }

  const pagesFilters = { search: keyword }
  const blogPostsFilters = { search: keyword, page: 1, pageSize: 6 }
  const usersFilters = { search: keyword }

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
        <SectionContainer>
          <div className="md:pt-18 flex w-full flex-col gap-y-14 pt-14 lg:gap-y-20">
            <AdvancedSearch
              placeholder={t('enterKeyword')}
              title={t('searching')}
              buttonText={t('search')}
              handleSelect={handleSelect}
              keyword={input}
            />

            {blogPostsSelected && <BlogPostsResults filters={blogPostsFilters} />}
            {pagesSelected && <PagesResults filters={pagesFilters} />}
            {usersSelected && <UsersResults filters={usersFilters} />}

            {/* TODO : commented newsletter for this release probably on future release we will uncomment */}
            {/* <NewsLetterSection /> */}
          </div>
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default Search
