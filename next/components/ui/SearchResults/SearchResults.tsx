import { BlogSearchCards } from '../BlogSearchCards/BlogSearchCards'
import { NoResultsFound } from '../NoResultsFound/NoResultsFound'
import { PageCards } from '../PageCards/PageCards'
import { FileList } from '../FileList/FileList'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { SearchOptionProps } from '../AdvancedSearch/AdvancedSearch'
import { searchArticles, searchPages } from '@utils/meili'
import { articleLimits } from '@utils/constants'

export interface SearchResultsProps {
  checkedOptions: SearchOptionProps[]
  keyword: string
}

export const SearchResults = ({ checkedOptions, keyword }: SearchResultsProps) => {
  const { t } = useTranslation('common')
  const documents = []
  const [articles, setArticles] = useState([])
  const [pages, setPages] = useState([])
  const [articleLimit, setArticleLimit] = useState(articleLimits.minLimit)

  const { data } = useSWR([keyword, articleLimit], () => {
    return {
      articles: searchArticles(keyword, articleLimit),
      pages: searchPages(keyword),
    }
  })

  useEffect(() => {
    data?.articles
      ?.then((a) => {
        setArticles(a.hits)
      })
      .catch((e) => console.log(e))
    data?.pages?.then((p) => setPages(p.hits)).catch((e) => console.log(e))
  }, [data, articleLimit])

  const noResultsFound = articles?.length == 0 && pages?.length == 0 && documents?.length == 0

  const articlesSelected = checkedOptions.some(({ key }) => key == 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key == 'pages')

  const handlePagination = (isOpen: boolean) => {
    isOpen ? setArticleLimit(articleLimits.maxLimit) : setArticleLimit(articleLimits.minLimit)
  }
  return (
    <div className="w-full">
      {noResultsFound ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <div className="flex flex-col gap-y-14 lg:gap-y-24 py-14 lg:py-24">
          {articlesSelected && articles?.length > 0 && (
            <BlogSearchCards title={t('articles')} blogs={articles} handleButtonClick={handlePagination} />
          )}
          {pagesSelected && pages?.length > 0 && <PageCards title={t('websites')} pages={pages} />}
          {documents?.length > 0 && (
            <div className="flex flex-col gap-y-3 lg:gap-y-6">
              <div className="text-default lg:text-md font-semibold">{t('documents')}</div>
              <FileList fileSections={documents} hideCategory />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
