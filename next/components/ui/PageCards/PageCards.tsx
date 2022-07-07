import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { PageCard, PageCardProps } from '../PageCard/PageCard'

export interface PageCardsProps {
  title: string
  pages: PageCardProps[]
}

export const PageCards = ({ title, pages }: PageCardsProps) => (
  <div className="flex flex-col gap-y-3 lg:gap-y-6">
    <span className="text-default font-semibold lg:text-md">{title}</span>
    <div className="hidden flex-col gap-y-6 lg:flex">
      {pages.map((page, index) => (
        <PageCard {...page} key={index} />
      ))}
    </div>
    <HorizontalScrollWrapper className="flex gap-x-4 lg:hidden">
      {pages.map((page, index) => (
        <PageCard {...page} key={index} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)
