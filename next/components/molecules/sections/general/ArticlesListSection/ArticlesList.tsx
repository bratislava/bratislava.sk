import { BlogPostEntity } from '@bratislava/strapi-sdk-homepage'
import { NewsCard, Pagination } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import { ArticlesFilter, Card } from '../../../../atoms/ArticlesFilter'

export interface ArticlesListProps {
  title: string
  itemsPerRow?: number
  itemsPerPage?: number
  category?: string
  includesFiltering?: boolean
  articlesContentClassName?: string
}

const ArticlesList = ({
  title,
  itemsPerPage = 6,
  category,
  includesFiltering = false,
}: ArticlesListProps) => {
  const { i18n } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<BlogPostEntity[]>([])
  const [totalArticles, setTotal] = useState<number>(0)
  const [numberOfPages, setNumberOfPages] = useState<number>(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'Mesto\nBratislava')
  const [categoryExists] = useState(!!category)
  const [filteredTags, setFilteredTags] = useState<Card[]>([])

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
        locale: i18n.language,
      })
      if (isMounted) return
      const blogData = (blogPosts?.data ?? []) as unknown as BlogPostEntity[]
      setData(blogData)
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
        locale: i18n.language,
      })

      if (isMounted) return
      setTotal(blogPosts?.meta?.pagination?.total ?? 0)
      setNumberOfPages(blogPosts?.meta?.pagination?.pageCount ?? 0)
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
      const helperTags =
        tags?.data.map((item) => ({
          title: item?.attributes?.title,
          color: item?.attributes?.pageCategory?.data?.attributes?.color,
          category: item?.attributes?.pageCategory?.data?.attributes?.title,
        })) ?? []
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
    setCurrentPage(1)

    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((selected) => selected !== tag))
      return
    }
    setSelectedTags([...selectedTags, tag])
  }

  return (
    <div>
      <div className="text-h2">{title}</div>
      <div className="lg:grid-cols-3 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:mt-8 gap-8">
        {data.map((article, index) => (
          <NewsCard
            key={index}
            coverImage={article?.attributes?.coverImage}
            title={article.attributes?.title}
            tag={article?.attributes?.tag}
            date_added={article.attributes?.date_added}
            publishedAt={article.attributes?.publishedAt}
            updatedAt={article.attributes?.updatedAt}
            excerpt={article.attributes?.excerpt}
            readMoreText={t('readMore')}
            slug={article?.attributes?.slug}
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
