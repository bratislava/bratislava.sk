import { BlogPost } from '@bratislava/strapi-sdk-homepage'
import { NewsCard, Pagination } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { useState, useEffect } from 'react'
import { ArticlesFilter } from '../../../atoms/ArticlesFilter'
import BratislavaPlaceholder from '../../../../public/bratislava-placeholder.jpg'
import _ from 'lodash'
export interface ArticlesListProps {
  title: string
  itemsPerRow?: number
  itemsPerPage?: number
  // category?: Object
  category?: string
  includesFiltering?: boolean
}

export const ArticlesList = ({
  title,
  itemsPerRow = 3,
  itemsPerPage = 6,
  category,
  includesFiltering = false,
}: ArticlesListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [totalArticles, setTotal] = useState(0)
  const [totalTags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'Mesto Bratislava')
  const [categoryExists, setIfExists] = useState(category ? true : false)
  const [filteredTags, setFilteredTags] = useState([])

  const handleCategory = (category: string) => {
    setSelectedCategory(category)
  }
  useEffect(() => {
    let isMounted = false

    const getData = async () => {
      console.log(category)

      const { blogPosts } = await client.LatestBlogsWithTags({
        limit: itemsPerPage,
        start: (currentPage - 1) * itemsPerPage,
        // TODO double check this filter after everything is connected
        filters: {
          tag: {
            title: {
              in: selectedTags,
            },
            pageCategory: {
              title: {
                eq: category,
              },
            },
          },
        },
      })
      if (isMounted) return
      console.log(blogPosts)
      setData(blogPosts?.data ?? [])
    }
    getData()
      .then()
      .catch((err) => console.log(err))

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
            title: {
              in: selectedTags,
            },
            pageCategory: {
              title: {
                eq: category,
              },
            },
          },
        },
      })
      if (selectedTags.length < 1 && !category) {
        if (isMounted) return
        else {
          setTotal(blogPosts.meta.pagination.total)
        }
      } else setTotal(blogPosts.meta.pagination.pageCount)
    }

    getTotalCount()
      .then()
      .catch((err) => console.log(err))

    return () => {
      isMounted = true
    }
  }, [selectedTags])

  useEffect(() => {
    let isMounted = false
    const getTags = async () => {
      const { tags } = await client.RelatedTags({
        // TODO double check this filter after everything is connected
        where: {
          pageCategory: {
            title: {
              eq: selectedCategory,
            },
          },
        },
      })
      if (isMounted) return
      const helperTags = tags?.data.map((item) => ({
        title: item?.attributes?.title,
        color: item?.attributes?.pageCategory?.data?.attributes?.color,
        category: item?.attributes?.pageCategory?.data?.attributes.title,
      }))

      const filteringTags = _.uniqBy(helperTags, 'title')
      setFilteredTags(filteringTags)
    }
    getTags()
      .then()
      .catch((err) => console.log(err))

    return () => {
      isMounted = true
    }
  }, [selectedCategory])

  const handleFiltering = (tag: string) => {
    selectedTags.includes(tag)
      ? setSelectedTags(selectedTags.filter((selected) => selected != tag))
      : setSelectedTags([...selectedTags, tag])
  }

  return (
    <div>
      <div className="text-lg font-semibold">{title}</div>
      <div className={`mt-8 grid grid-cols-${itemsPerRow} gap-x-7.5 gap-y-8`}>
        {data.map((article, index) => (
          <NewsCard
            key={index}
            coverImage={article.attributes.coverImage ?? { url: BratislavaPlaceholder }}
            title={article.attributes?.title}
            tag={article.attributes.tag}
            createdAt={article.published_at}
            excerpt={article.attributes?.excerpt}
            readMoreText={'Čítať viac'}
            slug={article.attributes.slug}
          />
        ))}
      </div>
      {totalArticles > itemsPerPage ? (
        <div className="mt-14">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalCount={totalArticles}
            currentPage={currentPage}
            pageHandler={setCurrentPage}
          />
        </div>
      ) : null}
      {includesFiltering ? (
        <div className="mt-24">
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
