import Panel from '../Panel/Panel';
import { ReactComponent as PageRedIcon } from '../../assets/images/page-red-icon.svg';
import { ReactComponent as PageRedIconSmall } from '../../assets/images/page-red-icon-small.svg';
import { ReactComponent as PageBlueIcon } from '../../assets/images/page-blue-icon.svg';
import { ReactComponent as PageBlueIconSmall } from '../../assets/images/page-blue-icon-small.svg';
import { ReactComponent as PageGreenIcon } from '../../assets/images/page-green-icon.svg';
import { ReactComponent as PageGreenIconSmall } from '../../assets/images/page-green-icon-small.svg';
import { ReactComponent as PageYellowIcon } from '../../assets/images/page-yellow-icon.svg';
import { ReactComponent as PageYellowIconSmall } from '../../assets/images/page-yellow-icon-small.svg';
import { ReactComponent as PagePurpleIcon } from '../../assets/images/page-purple-icon.svg';
import { ReactComponent as PagePurpleIconSmall } from '../../assets/images/page-purple-icon-small.svg';
import { ReactComponent as PageBrownIcon } from '../../assets/images/page-brown-icon.svg';
import { ReactComponent as PageBrownIconSmall } from '../../assets/images/page-brown-icon-small.svg';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right-large.svg';

const findIconByColor = (pageColor: string) => {
  switch (pageColor) {
    case 'red':
      return { default: PageRedIcon, small: PageRedIconSmall };
    case 'blue':
      return { default: PageBlueIcon, small: PageBlueIconSmall };
    case 'green':
      return { default: PageGreenIcon, small: PageGreenIconSmall };
    case 'yellow':
      return { default: PageYellowIcon, small: PageYellowIconSmall };
    case 'purple':
      return { default: PagePurpleIcon, small: PagePurpleIconSmall };
    case 'brown':
      return { default: PageBrownIcon, small: PageBrownIconSmall };
    default:
      return { default: PageRedIcon, small: PageRedIconSmall };
  }
};

export interface PageCardProps {
  pageColor: string;
  title: string;
}

export const PageCard = ({ pageColor, title }: PageCardProps) => {
  const backgroundColor =
    colors.find((c) => {
      return c.pageColor === pageColor;
    })?.backgroundColor ?? 'rgb(var(--color-red--light))';
  const { default: PageIcon, small: SmallPageIcon } =
    findIconByColor(pageColor);

  return (
    <>
      <Panel className="hidden lg:flex w-full" hoverable>
        <div className="px-12 py-4" style={{ backgroundColor }}>
          <PageIcon />
        </div>
        <div className="flex w-full items-center justify-between px-14">
          <span className="text-default font-semibold">{title}</span>
          <ChevronRight />
        </div>
      </Panel>
      <Panel
        className="flex flex-col lg:hidden min-w-[300px] px-6 py-4 gap-y-4"
        hoverable
      >
        <div className="flex items-center justify-between">
          <div
            className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full"
            style={{ backgroundColor }}
          >
            <SmallPageIcon />
          </div>
          <div className="pr-8">
            <ChevronRight />
          </div>
        </div>

        <span className="text-base font-medium">{title}</span>
      </Panel>
    </>
  );
};

const colors = [
  {
    pageColor: 'red',
    backgroundColor: 'rgb(var(--color-red--light))',
  },
  {
    pageColor: 'blue',
    backgroundColor: 'rgb(var(--color-blue--light))',
  },
  {
    pageColor: 'green',
    backgroundColor: 'rgb(var(--color-green--light))',
  },
  {
    pageColor: 'yellow',
    backgroundColor: 'rgb(var(--color-yellow--light))',
  },
  {
    pageColor: 'purple',
    backgroundColor: 'rgb(var(--color-purple--light))',
  },
  {
    pageColor: 'brown',
    backgroundColor: 'rgb(var(--color-brown--light))',
  },
];
