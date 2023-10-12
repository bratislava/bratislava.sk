// @ts-strict-ignore
import { InbaTagEntity } from '@backend/graphql'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Selection, Tag, TagGroup, TagList } from 'react-aria-components'

export interface InbaArticlesFilterProps {
  tags?: InbaTagEntity[]
  subCategories?: string[]
  subtitle?: string
  handleChange: (tags: string[]) => void
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

const InbaArticlesFilter = ({
  tags,
  subCategories,
  subtitle,
  handleChange,
}: InbaArticlesFilterProps) => {
  const t = useTranslations('ArticleFilter')
  const [myFilters, setMyfilters] = useState<Selection>(new Set<string>())

  const updateArticleFilter = useEffect(() => {
    handleChange(Array.from(myFilters, (item) => item.toString()))
  }, [myFilters])

  return (
    <div className="m-auto flex w-full flex-col items-center gap-6 py-18 text-left lg:w-[800px] lg:gap-10 lg:py-18 lg:text-center">
      {/* Header */}
      <div className="flex w-full flex-col gap-2 ">
        <h3 className=" text-h2 lg:text-h3">{t('articleFilter')}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {/* Categories represented by tags */}
      <div>
        <TagGroup
          selectionMode="multiple"
          selectedKeys={myFilters}
          onSelectionChange={setMyfilters}
        >
          <TagList className="flex flex-wrap gap-3 lg:justify-center">
            {tags?.map((tag) => {
              return (
                <Tag
                  className={({ isSelected }) =>
                    cx(
                      'flex items-center rounded-lg border px-4 py-1.5 text-size-p-small lg:py-2.5 lg:text-size-p-default',
                      {
                        'border-white bg-main-700 text-gray-0': isSelected,
                      },
                    )
                  }
                  aria-label={tag.attributes.title}
                  id={tag.id}
                >
                  {tag.attributes.title}
                </Tag>
              )
            })}
          </TagList>
        </TagGroup>
        {/* Subcategories */}
        {subCategories?.length ? (
          <div className="pt-8">
            <h5 className="text-h5 pb-3">{t('subcategories')}</h5>
            <TagGroup selectionMode="multiple">
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {subCategories.map((subcategoryName) => {
                  return (
                    <Tag
                      className={({ isSelected }) =>
                        cx('flex items-center rounded-lg border px-3 text-size-p-small lg:py-1.5', {
                          'bg-main-700 text-gray-0': isSelected,
                        })
                      }
                      aria-label={subcategoryName}
                    >
                      {subcategoryName}
                    </Tag>
                  )
                })}
              </TagList>
            </TagGroup>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default InbaArticlesFilter
