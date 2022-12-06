/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AdvancedSearch, SectionContainer } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import BlogPostsResults from '../components/molecules/SearchPage/BlogPostsResults'
import PagesResults from '../components/molecules/SearchPage/PagesResults'
import UsersResults from '../components/molecules/SearchPage/UsersResults'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async (ctx: any) => {
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
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const Search = ({ footer, mainMenu, page }: AsyncServerProps<typeof getServerSideProps>) => {
  const { t } = useTranslation('common')
  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []

  const [input, setInput] = useState<string>('')
  const [routerSearchQuery] = useQueryParam('keyword', withDefault(StringParam, ''))

  const debouncedSearchInputValue = useDebounce<string>(input, 300)

  const [searchQuery, setSearchQuery] = useState<string>(debouncedSearchInputValue)

  useEffect(() => {
    if (debouncedSearchInputValue !== searchQuery) {
      setSearchQuery(debouncedSearchInputValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInputValue])

  const defaultOptions = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
  ]
  const [checkedOptions, setCheckedOptions] = useState(defaultOptions)

  const blogPostsSelected = checkedOptions.some(({ key }) => key === 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key === 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key === 'users')

  useEffect(() => {
    setInput(routerSearchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pagesFilters = { search: searchQuery }
  const blogPostsFilters = { search: searchQuery, page: 1, pageSize: 6 }
  const usersFilters = { search: searchQuery }

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
            __html: pageStyle('main'),
          }}
        />
        <SectionContainer>
          <div className="md:pt-18 flex w-full flex-col gap-y-14 pt-14 lg:gap-y-20">
            <AdvancedSearch
              placeholder={t('enterKeyword')}
              title={t('searching')}
              buttonText={t('search')}
              checkedOptions={checkedOptions}
              handleSelect={setCheckedOptions}
              input={input}
              setInput={setInput}
              setSearchQuery={setSearchQuery}
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
