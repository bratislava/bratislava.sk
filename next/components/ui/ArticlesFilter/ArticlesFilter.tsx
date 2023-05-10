// @ts-strict-ignore
import { TabBarTab } from '@components/ui/ArticlesFilter/TabBarTab'
import { Tag } from '@components/ui/ArticlesFilter/Tag'
import { HorizontalScrollWrapper } from '@components/ui/HorizontalScrollWrapper/HorizontalScrollWrapper'
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

// TODO to be removed when redesigning ArticleList
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
