import {
  AccordionCard,
  AccordionCardProps,
} from '../AccordionCard/AccordionCard';
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper';

export interface AccordionCardsProps {
  items: AccordionCardProps[];
}

export const AccordionCards = ({ items }: AccordionCardsProps) => {
  return (
    <>
      <HorizontalScrollWrapper className="flex lg:hidden gap-x-5 w-screen -ml-7.5 px-7.5 py-8">
        {items.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </HorizontalScrollWrapper>
      <div className="hidden lg:grid grid-cols-3 w-full gap-y-8 gap-x-7.5">
        {items.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};
