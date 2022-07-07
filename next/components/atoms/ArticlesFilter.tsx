import { HorizontalScrollWrapper, TabBarTab, Tag } from '@bratislava/ui-bratislava'
import { useEffect, useState } from 'react'

export interface Card {
  title: string
  color: string
  category: string
}

export interface ArticlesFilter {
  data?: Array<Card>
  filterHandler?: (arg0: string) => void
  categoryHandler?: (arg0: string) => void
  categoryExists?: boolean
  category?: Object
  selectedTags?: string[]
}

export const ArticlesFilter = ({
  data,
  filterHandler,
  categoryHandler,
  categoryExists,
  category,
  selectedTags,
}: ArticlesFilter) => {
  const BratislavaCategories = [
    'Mesto\nBratislava',
    'Doprava\na mapy',
    'Životné prostredie \na výstavba',
    'Sociálne služby \na bývanie',
    'Vzdelávanie \na voľný čas',
    'Kultúra \na komunity',
  ]

  return (
    <div>
      <div className="text-center text-lg font-semibold">Rozdelenie obsahu článkov</div>
      <HorizontalScrollWrapper className="mt-10">
        <div className="flex">
          {!categoryExists
            ? BratislavaCategories.map((tab, index) => (
                <TabBarTab
                  className="mr-8 h-14 text-sm"
                  key={tab}
                  tab={{
                    title: tab,
                    key: tab,
                  }}
                  handleSelect={categoryHandler}
                  isActive={tab === category}
                />
              ))
            : null}
        </div>
      </HorizontalScrollWrapper>
      <div className="mt-11">
        {data
          .filter((tag) => {
            return tag.category == category
          })
          .map((item, index) => (
            <Tag
              interactable
              key={item.title}
              title={item.title}
              color={item.color}
              handleClick={filterHandler}
              alreadySelected={selectedTags.includes(item.title)}
              className="mr-3 mb-3 h-8 text-sm font-medium"
            />
          ))}
      </div>
    </div>
  )
}
