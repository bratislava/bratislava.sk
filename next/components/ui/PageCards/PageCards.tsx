import { PageCard, PageCardProps } from '../PageCard/PageCard'

export interface PageCardsProps {
  pages: PageCardProps[]
}

export const PageCards = ({ pages }: PageCardsProps) => (
  <div className="flex flex-col gap-y-6">
    {pages.map((page, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PageCard {...page} key={index} />
    ))}
  </div>
)
