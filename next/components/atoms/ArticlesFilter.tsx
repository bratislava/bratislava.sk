// @ts-strict-ignore
import { HorizontalScrollWrapper } from '@bratislava/ui-bratislava/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { TabBarTab } from '@bratislava/ui-bratislava/TabBarTab/TabBarTab'
import { Tag } from '@bratislava/ui-bratislava/Tag/Tag'
import { useTranslations } from 'next-intl'

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

  const t = useTranslations()

  return (
    <div>
      <div className="text-h2 text-center">{t('articleCategories')}</div>
      <HorizontalScrollWrapper className="-mx-8 mt-8 px-8 lg:mt-10">
        <div className="flex">
          {categoryExists
            ? null
            : BratislavaCategories.map((tab) => (
                <TabBarTab
                  className="text-large-respo mr-8"
                  key={tab}
                  tab={{
                    title: tab,
                    key: tab,
                  }}
                  size="small"
                  handleSelect={categoryHandler}
                  isActive={tab === category}
                />
              ))}
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
              className="text-default mb-3 mr-3 font-medium"
            />
          ))}
      </div>
    </div>
  )
}
