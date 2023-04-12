import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { PageCard, PageCardProps } from '../PageCard/PageCard'

export interface PageCardsProps {
  pages: PageCardProps[]
}

export const PageCards = ({ pages }: PageCardsProps) => (
  <div className="flex flex-col gap-y-3 lg:gap-y-6">
    <div className="hidden flex-col gap-y-6 lg:flex">
      {pages.map((page, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PageCard {...page} key={index} />
      ))}
    </div>
    <HorizontalScrollWrapper className="flex gap-x-4 pb-6 pt-4 lg:hidden">
      {pages.map((page, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PageCard {...page} key={index} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)
