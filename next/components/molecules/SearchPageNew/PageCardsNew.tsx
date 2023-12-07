import { PageCardNew, PageCardNewProps } from '@components/molecules/SearchPageNew/PageCardNew'

export interface PageCardsNewProps {
  pages: PageCardNewProps[]
}

export const PageCardsNew = ({ pages }: PageCardsNewProps) => (
  <div className="flex flex-col gap-y-6">
    {pages.map((page, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PageCardNew {...page} key={index} />
    ))}
  </div>
)
