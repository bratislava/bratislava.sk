import { HorizontalScrollWrapper, TabBarTab, Tag } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'

export interface Card {
  title: string
  color: string
  category: string
}

export interface ArticlesFilterProps {
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
}: ArticlesFilterProps) => {
  const BratislavaCategories = [
    'Mesto\nBratislava',
    'Doprava\na mapy',
    'Životné prostredie \na výstavba',
    'Sociálne služby \na bývanie',
    'Vzdelávanie \na voľný čas',
    'Kultúra \na komunity',
  ]

  const { t } = useTranslation()

  return (
    <div>
      <div className="text-center text-default lg:text-lg font-semibold">{t('articleCategories')}</div>
      <HorizontalScrollWrapper className="mt-8 lg:mt-10 -mx-7.5 px-7.5">
        <div className="flex">
          {!categoryExists
            ? BratislavaCategories.map((tab) => (
                <TabBarTab
                  className="mr-8 text-sm"
                  key={tab}
                  tab={{
                    title: tab,
                    key: tab,
                  }}
                  size="small"
                  handleSelect={categoryHandler}
                  isActive={tab === category}
                />
              ))
            : null}
        </div>
      </HorizontalScrollWrapper>
      <div className="mt-6 lg:mt-11">
        {data
          .filter((tag) => {
            return tag.category == category
          })
          .map((item) => (
            <Tag
              interactable
              key={item.title}
              title={item.title}
              color={item.color}
              handleClick={filterHandler}
              alreadySelected={selectedTags.includes(item.title)}
              className="mr-3 mb-3 min-h-8 text-sm font-medium"
            />
          ))}
      </div>
    </div>
  )
}
