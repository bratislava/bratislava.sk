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
    'Mesto Bratislava',
    'Doprava a mapy',
    'Životné prostredie a výstavba',
    'Sociálne služby a bývanie',
    'Vzdelávanie a voľný čas',
    'Kultúra a komunity',
  ]

  return (
    <div>
      <div className="text-lg text-center font-semibold">Rozdelenie obsahu článkov</div>
      <HorizontalScrollWrapper className="mt-10">
        <div className="flex">
          {!categoryExists
            ? BratislavaCategories.map((tab, index) => (
                <TabBarTab
                  className="h-14 mr-8 text-sm"
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
          .filter((tag) => tag.category == category)
          .map((item, index) => (
            <Tag
              interactable={true}
              key={item.title}
              title={item.title}
              color={item.color}
              handleClick={filterHandler}
              alreadySelected={selectedTags.includes(item.title)}
              className="text-sm mr-3 mb-3 h-8 font-medium"
            />
          ))}
      </div>
    </div>
  )
}
