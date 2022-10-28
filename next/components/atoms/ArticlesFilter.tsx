// @ts-strict-ignore
import { HorizontalScrollWrapper, TabBarTab, Tag } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'

export interface Card {
  title: string | null | undefined
  color: string | null | undefined
  category: string | null | undefined
}

export interface ArticlesFilterProps {
  data?: Array<Card>
  filterHandler?: (arg0: string) => void
  categoryHandler?: (arg0: string) => void
  categoryExists?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
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
      <div className="text-h2 text-center">{t('articleCategories')}</div>
      <HorizontalScrollWrapper className="-mx-8 mt-8 px-8 lg:mt-10">
        <div className="flex">
          {!categoryExists
            ? BratislavaCategories.map((tab) => (
                <TabBarTab
                  className="text-p1 mr-8"
                  key={tab}
                  tabTitle={tab}
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
            return tag.category === category
          })
          .map((item) => (
            <Tag
              interactable
              key={item.title}
              title={item.title}
              color={item.color}
              handleClick={filterHandler}
              alreadySelected={selectedTags.includes(item.title)}
              className="min-h-8 mr-3 mb-3 text-p2-medium"
            />
          ))}
      </div>
    </div>
  )
}
