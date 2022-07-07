import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AdvancedSearch,
  FooterProps,
  PageHeader,
  SearchOptionProps,
  SearchResults,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle } from '../utils/page'
import { AsyncServerProps } from '@utils/types'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { parseFooter, parseMainMenu } from '../utils/page'
import { useEffect, useState } from 'react'

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
      footer: footer,
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
  const handleClick = (options: SearchOptionProps[], keyword: string) => {
    setCheckedOptions(options)
    setInput(keyword)
  }

  const handleSelect = (options: SearchOptionProps[]) => {
    setCheckedOptions(options)
  }
  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'vyhladavanie' },
        { locale: 'en', slug: 'search' },
      ]}
      slug={'/vyhladavanie'}
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
          imageSrc={''}
          className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="min-h-[220px] relative">
              <h1 className="pt-30 text-md md:text-2xl font-bold whitespace-pre-wrap">{t('searchTheSite')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="flex gap-y-14 lg:gap-y-24 pt-14 md:pt-18 w-full">
          <AdvancedSearch
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
            handleClick={handleClick}
            handleSelect={handleSelect}
            keyword={input}
          />
          <SearchResults checkedOptions={checkedOptions} keyword={input} />
          {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
          {/* <NewsLetterSection /> */}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default Search
