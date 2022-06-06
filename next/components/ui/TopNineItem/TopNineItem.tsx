import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right.svg';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';
import { ReactComponent as icon1 } from './icons/elektronicke-sluzby.svg';
import { ReactComponent as icon5 } from './icons/kampane-a-projekty.svg';
import { ReactComponent as icon8 } from './icons/kontakty-a-uradne-hodiny.svg';
import { ReactComponent as icon2 } from './icons/miestne-dane-a-poplatky.svg';
import { ReactComponent as icon4 } from './icons/nahlasenie-podnetov.svg';
import { ReactComponent as icon7 } from './icons/organizacna-struktura.svg';
import { ReactComponent as icon9 } from './icons/pracovne-prilezitosti.svg';
import { ReactComponent as icon3 } from './icons/prenajom-priestorov-pp.svg';
import { ReactComponent as icon6 } from './icons/turistom-v-hlavnom-meste.svg';

const ICONS = {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
};

export type TopNineItemIcon = keyof typeof ICONS;

export interface TopNineItemProps {
  className?: string;
  icon: TopNineItemIcon;
  title: string;
  href: string;
  linkTitle: string;
}

export const TopNineItem = ({
  className,
  icon,
  title,
  href,
  linkTitle,
}: TopNineItemProps) => {
  const IconComponent = ICONS[icon];
  const { Link: UILink } = useUIContext();
  return (
    <div
      className={cx(
        'w-full flex-shrink-0 flex flex-col font-medium text-font xs:w-100',
        className
      )}
    >
      <div className="mb-8 lg:mb-3.5">
        <IconComponent className="h-20" />
      </div>
      <div className="text-sm font-semibold lg:text-md lg:font-medium leading-normal whitespace-pre-wrap w-full">
        {title}
      </div>
      <UILink
        className="flex text-font underline mt-6 space-x-5 items-center group cursor-pointer h-6"
        href={href}
      >
        <span className="font-semibold text-sm">{linkTitle}</span>
        <span className="group-hover:hidden">
          <ChevronRight />
        </span>
        <span className="hidden group-hover:block">
          <ArrowRight />
        </span>
      </UILink>
    </div>
  );
};

export default TopNineItem;
