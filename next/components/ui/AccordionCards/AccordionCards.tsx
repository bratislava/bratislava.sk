import { AccordionCard } from '../AccordionCard/AccordionCard'
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface AccordionCardsProps {
  // TODO fix typing
  items: any[]
}

export const AccordionCards = ({ items }: AccordionCardsProps) => {
  return (
    <>
      <HorizontalScrollWrapper className="-ml-8 flex w-screen gap-x-5 px-8 py-8 lg:hidden">
        {items.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </HorizontalScrollWrapper>
      <div className="hidden w-full grid-cols-3 gap-y-8 gap-x-8 lg:grid">
        {items.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </div>
    </>
  )
}
