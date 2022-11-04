/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable promise/always-return */

import { OrganizationalStructureAccordionCards } from 'components/molecules/OrganizationalStructure/OrganizationalStructureAccordionCards'
import { useTranslation } from 'next-i18next'

import { MSGraphFilteredGroupUser } from '../../../backend/services/ms-graph'
import { BlogPostMeili } from '../../../utils/meiliTypes'
import { SearchOptionProps } from '../AdvancedSearch/AdvancedSearch'
import { BlogSearchCards } from '../BlogSearchCards/BlogSearchCards'
import { NoResultsFound } from '../NoResultsFound/NoResultsFound'
import { PageCardProps } from '../PageCard/PageCard'
import { PageCards } from '../PageCards/PageCards'

export interface SearchResultsProps {
  checkedOptions: SearchOptionProps[]
  pagesResult: PageCardProps[]
  blogPostsResult: BlogPostMeili[]
  usersResult: MSGraphFilteredGroupUser[]
}

export const SearchResults = ({ checkedOptions, pagesResult, blogPostsResult, usersResult }: SearchResultsProps) => {
  const { t } = useTranslation('common')
  // const documents = []

  const blogPostsSelected = checkedOptions.some(({ key }) => key === 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key === 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key === 'users')

  //   <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />

  // console.log(blogPostsResult.map((blog) => blog.title))
  return (
    <div className="w-full">
      {noResultsFound ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <div className="flex flex-col gap-y-14 py-14 lg:gap-y-24 lg:py-24">
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
          )} */}
      </div>
    </div>
  )
}
