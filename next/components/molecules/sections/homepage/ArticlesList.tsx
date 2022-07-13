/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/valid-params */
import { NewsCard, Pagination } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import BratislavaPlaceholder from '../../../../public/bratislava-placeholder.jpg'
import { ArticlesFilter } from '../../../atoms/ArticlesFilter'

export interface ArticlesListProps {
  title: string
  itemsPerRow?: number
  itemsPerPage?: number
  // category?: Object
  category?: string
  includesFiltering?: boolean
  locale?: string
}

export const ArticlesList = ({
  title,
  itemsPerRow = 3,
  itemsPerPage = 6,
  category,
  includesFiltering = false,
  locale,
}: ArticlesListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [totalArticles, setTotal] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'Mesto\nBratislava')
  const [categoryExists] = useState(!!category)
  const [filteredTags, setFilteredTags] = useState([])

  const { t } = useTranslation()

  const handleCategory = (innerCategory: string) => {
    setSelectedCategory(innerCategory)
  }
  useEffect(() => {
    let isMounted = false

    const getData = async () => {
      const { blogPosts } = await client.LatestBlogsWithTags({
        limit: itemsPerPage,
        start: (currentPage - 1) * itemsPerPage,
        sort: 'publishedAt:desc',
        // TODO double check this filter after everything is connected
        filters: {
          tag: {
            title:
              selectedTags.length > 0
                ? {
                    in: selectedTags,
                  }
                : {},
            pageCategory: category
              ? {
                  title: {
                    eq: selectedCategory,
                  },
                }
              : {},
          },
        },
        locale,
      })
      if (isMounted) return
      setData(blogPosts?.data ?? [])
    }
    getData()
      .then()
      .catch((error) => console.log(error))

    return () => {
      isMounted = true
    }
  }, [currentPage, selectedTags])

  useEffect(() => {
    let isMounted = false
    const getTotalCount = async () => {
      const { blogPosts } = await client.TotalPostsCount({
        // TODO double check this filter after everything is connected
        where: {
          tag: {
            title:
              selectedTags.length > 0
                ? {
                    in: selectedTags,
                  }
                : {},
            pageCategory: category
              ? {
                  title: {
                    eq: selectedCategory,
                  },
                }
              : {},
          },
        },
        limit: itemsPerPage,
        locale,
      })

      if (isMounted) return
      setTotal(blogPosts.meta.pagination.total)
      setNumberOfPages(blogPosts.meta.pagination.pageCount)
    }

    getTotalCount()
      .then()
      .catch((error) => console.log(error))

    return () => {
      isMounted = true
    }
  }, [selectedTags])

  useEffect(() => {
    let isMounted = false
    const getTags = async () => {
      const { tags } = await client.RelatedTags({
        where: category
          ? {
              pageCategory: {
                title: {
                  eq: selectedCategory,
                },
              },
            }
          : {},
      })
      if (isMounted) return
      const helperTags = tags?.data.map((item) => ({
        title: item?.attributes?.title,
        color: item?.attributes?.pageCategory?.data?.attributes?.color,
        category: item?.attributes?.pageCategory?.data?.attributes.title,
      }))
      setFilteredTags(helperTags)
    }
    getTags()
      .then()
      .catch((error) => console.log(error))

    return () => {
      isMounted = true
    }
  }, [selectedCategory])

  const handleFiltering = (tag: string) => {
    selectedTags.includes(tag)
      ? setSelectedTags(selectedTags.filter((selected) => selected !== tag))
      : setSelectedTags([...selectedTags, tag])
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="text-default font-semibold lg:text-lg">{title}</div>
      <div className={`lg:grid-cols- mt-6 grid grid-cols-1 sm:grid-cols-2 lg:mt-8${itemsPerRow} gap-x-7.5 gap-y-8`}>
        {data.map((article, index) => (
          <NewsCard
            key={index}
            coverImage={article.attributes.coverImage ?? { url: BratislavaPlaceholder }}
            title={article.attributes?.title}
            tag={article.attributes.tag}
            date_added={article.attributes?.date_added}
            publishedAt={article.attributes?.publishedAt}
            updatedAt={article.attributes?.updatedAt}
            excerpt={article.attributes?.excerpt}
            readMoreText={t('readMore')}
            slug={article.attributes.slug}
          />
        ))}
      </div>
      {totalArticles > itemsPerPage ? (
        <div className="mt-10 lg:mt-14">
          <Pagination
            totalPages={numberOfPages}
            totalCount={totalArticles}
            currentPage={currentPage}
            pageHandler={setCurrentPage}
          />
        </div>
      ) : null}
      {includesFiltering ? (
        <div className="mt-14 lg:mt-24">
          <ArticlesFilter
            category={selectedCategory}
            filterHandler={handleFiltering}
            categoryHandler={handleCategory}
            data={filteredTags}
            selectedTags={selectedTags}
            categoryExists={categoryExists}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ArticlesList
