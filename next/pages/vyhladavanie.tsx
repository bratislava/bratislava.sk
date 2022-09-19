/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AdvancedSearch,
  FooterProps,
  PageHeader,
  SearchOptionProps,
  SearchResults,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
// import { buildMockData } from '@utils/homepage-mockdata'
import { AsyncServerProps } from '@utils/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'

import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle, parseFooter, parseMainMenu } from '../utils/page'

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
              <h1 className="whitespace-pre-wrap pt-30 text-md font-bold md:text-2xl">{t('searchTheSite')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="flex w-full gap-y-14 pt-14 md:pt-18 lg:gap-y-24">
          <AdvancedSearch
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
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
