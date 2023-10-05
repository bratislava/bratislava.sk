// @ts-strict-ignore
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Tag, TagGroup, TagList } from 'react-aria-components'

export interface InbaArticlesFilterProps {
  tagNames?: string[]
  subCategories?: string[]
  subtitle?: string
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

// TODO replace temporary variables with real
const temporarySubcategories = [
  'Subcategory name',
  'Subcategory name',
  'Subcategory name',
  'Subcategory name',
  'Subcategory name',
  'Subcategory name',
  'Subcategory name',
]
const temporaryTagNames = [
  'Všetky články',
  'Mesto Bratislava',
  'Doprava a mapy',
  'Životné prostredie a výstavba',
  'Sociálne služby a bývanie',
  'Vzdelávanie a voľný čas',
  'Kultúra a komunity',
]

const InbaArticlesFilter = ({
  tagNames = temporaryTagNames,
  subCategories = temporarySubcategories,
  subtitle,
}: InbaArticlesFilterProps) => {
  const t = useTranslations('ArticleFilter')

  return (
    <div className="m-auto flex w-full flex-col items-center gap-6 py-18 text-left lg:w-[800px] lg:gap-10 lg:py-18 lg:text-center">
      {/* Header */}
      <div className="flex w-full flex-col gap-2 ">
        <h3 className=" text-h2 lg:text-h3">{t('articleFilter')}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {/* Categories */}
      <div>
        <TagGroup selectionMode="multiple">
          <TagList className="flex flex-wrap gap-3 lg:justify-center">
            {tagNames.map((tagName) => {
              return (
                <Tag
                  className={({ isFocused, isSelected }) =>
                    cx(
                      'flex items-center rounded-lg border px-4 py-1.5 text-size-p-small lg:py-2.5 lg:text-size-p-default',
                      {
                        'rounded-none': isFocused,
                        'border-white bg-main-700 text-gray-0': isSelected,
                      },
                    )
                  }
                >
                  {tagName}
                </Tag>
              )
            })}
          </TagList>
        </TagGroup>
        {/* Subcategories */}
        <div className="pt-8">
          <h5 className="text-h5 pb-3">{t('subcategories')}</h5>
          <TagGroup selectionMode="multiple">
            <TagList className="flex flex-wrap gap-2 lg:justify-center">
              {subCategories.map((subcategoryName) => {
                return (
                  <Tag
                    className={({ isFocused, isSelected }) =>
                      cx('flex items-center rounded-lg border px-3 text-size-p-small lg:py-1.5', {
                        'rounded-none': isFocused,
                        'bg-main-700 text-gray-0': isSelected,
                      })
                    }
                  >
                    {subcategoryName}
                  </Tag>
                )
              })}
            </TagList>
          </TagGroup>
        </div>
      </div>
    </div>
  )
}

export default InbaArticlesFilter
