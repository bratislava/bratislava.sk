import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { PageCard, PageCardProps } from '../PageCard/PageCard'

export interface PageCardsProps {
  title: string
  pages: PageCardProps[]
}

export const PageCards = ({ title, pages }: PageCardsProps) => (
  <div className="flex flex-col gap-y-3 lg:gap-y-6">
    <span className="text-default lg:text-md font-semibold">{title}</span>
    <div className="hidden lg:flex flex-col gap-y-6">
      {pages.map((page, index) => (
        <PageCard {...page} key={index} />
      ))}
    </div>
    <HorizontalScrollWrapper className="flex lg:hidden gap-x-4">
      {pages.map((page, index) => (
        <PageCard {...page} key={index} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)
