import PageCard, { PageCardProps } from '@/components/ui/PageCard/PageCard'

export type PageCardsProps = {
  pages: PageCardProps[]
}

const PageCards = ({ pages }: PageCardsProps) => (
  <div className="flex flex-col gap-y-6">
    {pages.map((page, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <PageCard {...page} key={index} />
    ))}
  </div>
)

export default PageCards
