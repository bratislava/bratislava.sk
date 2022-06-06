import cx from 'classnames';
import { NumericalListItem } from '../NumericalListItem/NumericalListItem';
import { NumericalListItemObject } from '../NumericalListSection/NumericalListSection';

export interface NumericalListProps {
  items: NumericalListItemObject[];
  hasBackground: boolean;
  variant?: 'basic' | 'combined' | 'roadmap';
}

export const NumericalList = ({
  items,
  hasBackground,
  variant,
}: NumericalListProps) => {
  return (
    <>
      {items.map((item, index) => (
        <NumericalListItem
          key={index}
          index={index}
          item={item}
          variant={variant}
          hasBackground={hasBackground}
        />
      ))}
    </>
  );
};
