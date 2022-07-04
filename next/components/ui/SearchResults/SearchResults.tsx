import { BlogSearchCards } from '../BlogSearchCards/BlogSearchCards'
import { NoResultsFound } from '../NoResultsFound/NoResultsFound'
import { PageCards } from '../PageCards/PageCards'
import { FileList } from '../FileList/FileList'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import useSWR from 'swr'
import { SearchOptionProps } from '../AdvancedSearch/AdvancedSearch'
import { searchArticles, searchPages } from '@utils/meili'

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
  data?.articles?.then((a) => setArticles(a)).catch((e) => console.log(e))
  data?.pages?.then((p) => setPages(p)).catch((e) => console.log(e))

  const noResultsFound = articles?.length == 0 && pages?.length == 0 && documents?.length == 0

  const articlesSelected = checkedOptions.some(({ key }) => key == 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key == 'pages')

  articles && console.log('articles', articles)
  pages && console.log('pages', pages)
  return (
    <>
      {noResultsFound ? (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      ) : (
        <div className="flex flex-col gap-y-14 lg:gap-y-24 py-14 lg:py-24">
          {articles?.length > 0 && articlesSelected && <BlogSearchCards title={t('articles')} blogs={articles} />}
          {pages?.length > 0 && pagesSelected && <PageCards title={t('websites')} pages={pages} />}
          {documents?.length > 0 && (
            <div className="flex flex-col gap-y-3 lg:gap-y-6">
              <div className="text-default lg:text-md font-semibold">{t('documents')}</div>
              <FileList fileSections={documents} hideCategory />
            </div>
          )}
        </div>
      )}
    </>
  )
}

const blogs = [
  {
    data: {
      attributes: {
        coverImage: {
          data: {
            attributes: {
              url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/44654929_1094813014012650_2908887100818456576_n_2f821d87a4.png',
            },
          },
        },
        publishedAt: '2022-04-05T14:12:11.528Z',
        tag: {
          data: {
            attributes: {
              pageCategory: {
                data: {
                  attributes: {
                    color: 'red',
                    shortTitle: 'Mesto Bratislava',
                  },
                },
              },
            },
          },
        },
        title: 'Výsledky výberového konania na pozíciu náčelníka Mestskej polície',
      },
    },
  },
]

// const pages = [
//   {
//     pageColor: 'red',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'blue',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'green',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'yellow',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'purple',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'brown',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
// ]
