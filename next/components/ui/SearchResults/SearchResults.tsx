import { searchArticles, searchPages } from '@utils/meili'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { SearchOptionProps } from '../AdvancedSearch/AdvancedSearch'
import { BlogSearchCards } from '../BlogSearchCards/BlogSearchCards'
import { FileList } from '../FileList/FileList'
import { NoResultsFound } from '../NoResultsFound/NoResultsFound'
import { PageCards } from '../PageCards/PageCards'

export interface SearchResultsProps {
  checkedOptions: SearchOptionProps[]
  keyword: string
}

export const SearchResults = ({ checkedOptions, keyword }: SearchResultsProps) => {
  const { t } = useTranslation('common')
  const documents = []
  const { data } = useSWR([keyword], () => {
    return {
      articles: searchArticles(keyword),
      pages: searchPages(keyword),
    }
  })
  const [articles, setArticles] = useState([])
  const [pages, setPages] = useState([])

  useEffect(() => {
    data?.articles
      ?.then((a) => {
        setArticles(a.hits)
      })
      .catch((error) => console.log(error))
    data?.pages?.then((p) => setPages(p.hits)).catch((error) => console.log(error))
  }, [data])

  const noResultsFound = articles?.length == 0 && pages?.length == 0 && documents?.length == 0

  const articlesSelected = checkedOptions.some(({ key }) => key == 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key == 'pages')
  return (
    <div className="w-full">
      {noResultsFound ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <div className="flex flex-col gap-y-14 py-14 lg:gap-y-24 lg:py-24">
          {articlesSelected && articles?.length > 0 && <BlogSearchCards title={t('articles')} blogs={articles} />}
          {pagesSelected && pages?.length > 0 && <PageCards title={t('websites')} pages={pages} />}
          {documents?.length > 0 && (
            <div className="flex flex-col gap-y-3 lg:gap-y-6">
              <div className="text-default font-semibold lg:text-md">{t('documents')}</div>
              <FileList fileSections={documents} hideCategory />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
