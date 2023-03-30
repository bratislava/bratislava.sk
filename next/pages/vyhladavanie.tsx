import { GeneralQuery } from '@bratislava/strapi-sdk-homepage'
import { AdvancedSearch, SectionContainer } from '@bratislava/ui-bratislava'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { pageStyle } from '@utils/page'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

import PageContextProvider from '../components/layouts/PageContextProvider'
import PageLayout from '../components/layouts/PageLayout'
import BlogPostsResults from '../components/molecules/SearchPage/BlogPostsResults'
import PagesResults from '../components/molecules/SearchPage/PagesResults'
import UsersResults from '../components/molecules/SearchPage/UsersResults'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const general = await client.General({ locale })

  return {
    props: {
      general,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 10,
  }
}

const Search = ({ general }: PageProps) => {
  const { t, i18n } = useTranslation('common')

  const [routerQueryValue] = useQueryParam('keyword', withDefault(StringParam, ''))
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>(debouncedInput)

  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  const defaultOptions = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
  ]
  const [checkedOptions, setCheckedOptions] = useState(defaultOptions)

  const blogPostsSelected = checkedOptions.some(({ key }) => key === 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key === 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key === 'users')

  const pagesFilters = { search: searchValue }
  const blogPostsFilters = { search: searchValue, page: 1, pageSize: 6 }
  const usersFilters = { search: searchValue }

  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider
        locale={i18n.language}
        localizations={[
          { locale: 'sk', slug: 'vyhladavanie' },
          { locale: 'en', slug: 'search' },
        ]}
        slug="/vyhladavanie"
      >
        <PageLayout>
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageStyle('main'),
            }}
          />
          <SectionContainer>
            <div className="flex w-full flex-col gap-y-14 pt-14 md:pt-18 lg:gap-y-20">
              <AdvancedSearch
                placeholder={t('enterKeyword')}
                title={t('searching')}
                buttonText={t('search')}
                checkedOptions={checkedOptions}
                handleSelect={setCheckedOptions}
                input={input}
                setInput={setInput}
                setSearchQuery={setSearchValue}
              />

              {blogPostsSelected && <BlogPostsResults filters={blogPostsFilters} />}
              {pagesSelected && <PagesResults filters={pagesFilters} />}
              {usersSelected && <UsersResults filters={usersFilters} />}

              {/* TODO : commented newsletter for this release probably on future release we will uncomment */}
              {/* <NewsLetterSection /> */}
            </div>
          </SectionContainer>
        </PageLayout>
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Search
