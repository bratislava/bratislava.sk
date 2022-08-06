import { searchArticles, searchPages } from '@utils/meili'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { SearchOptionProps } from '../AdvancedSearch/AdvancedSearch'
import { articleLimits } from '@utils/constants'
import { BlogSearchCards } from '../BlogSearchCards/BlogSearchCards'
import { FileList } from '../FileList/FileList'
import { NoResultsFound } from '../NoResultsFound/NoResultsFound'
import { PageCards } from '../PageCards/PageCards'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { userSearchFetcher } from '@utils/organisationalStructure'
import { OrganizationalStructureAccordionCards } from 'components/molecules/OrganizationalStructure/OrganizationalStructureAccordionCards'

export interface SearchResultsProps {
  checkedOptions: SearchOptionProps[]
  keyword: string
}

export const SearchResults = ({ checkedOptions, keyword }: SearchResultsProps) => {
  const { t } = useTranslation('common')
  const documents = []
  const [articles, setArticles] = useState([])
  const [pages, setPages] = useState([])
  const [users, setUsers] = useState([])
  const [articleLimit, setArticleLimit] = useState(articleLimits.minLimit)

  // TODO rewrite without using useState
  const { data, error } = useSWR([keyword, articleLimit], () => {
    return {
      articles: searchArticles(keyword, articleLimit),
      pages: searchPages(keyword),
      users: userSearchFetcher(keyword),
    }
  })

  useEffect(() => {
    data?.articles
      ?.then((a) => {
        setArticles(a.hits)
      })
      .catch((e) => console.log(e))
    data?.pages?.then((p) => setPages(p.hits)).catch((e) => console.log(e))
    data?.users?.then((u) => setUsers(u)).catch((e) => console.log(e))
  }, [data, articleLimit])

  const noResultsFound = articles?.length === 0 && pages?.length === 0 && documents?.length === 0 && users.length === 0

  const articlesSelected = checkedOptions.some(({ key }) => key == 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key == 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key == 'pages')

  const handlePagination = (isOpen: boolean) => {
    isOpen ? setArticleLimit(articleLimits.maxLimit) : setArticleLimit(articleLimits.minLimit)
  }
  if (error) return <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
  if (!data) return <LoadingSpinner size="small" className="pt-10" />
  return (
    <div className="w-full">
      {noResultsFound ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <div className="flex flex-col gap-y-14 lg:gap-y-24 py-14 lg:py-24">
          {usersSelected && users.length > 0 && (
            <div>
              <div className="text-default font-semibold lg:text-md">{t('organisationalStructure')}</div>
              <OrganizationalStructureAccordionCards users={users} />
            </div>
          )}
          {pagesSelected && pages?.length > 0 && <PageCards title={t('websites')} pages={pages} />}
          {articlesSelected && articles?.length > 0 && (
            <BlogSearchCards title={t('articles')} blogs={articles} handleButtonClick={handlePagination} />
          )}
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
