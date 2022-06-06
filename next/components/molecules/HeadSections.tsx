import * as React from 'react';
import cx from 'classnames';
import { ReactComponent as HomeIcon } from '../assets/images/home-icon.svg';
import HeaderSection, { HeaderSectionProps } from '../atoms/HeadSection';

interface IProps {
  className?: string;
  subSections?: Array<HeaderSectionProps>;
}

const HeaderSections = ({
  className,
  subSections = [
    {
      title: 'Správa mesta',
      icon: <HomeIcon />,
      items: [
        { url: '/', title: 'Magistrát' },
        { url: '/', title: 'Volené orgány' },
        { url: '/', title: 'Mestské organizácie' },
        { url: '/', title: 'Volené orgány' },
      ],
      dispayedItems: { number: 3, additionalUrl: '/' },
    },
    {
      title: 'Transparentné mesto',
      icon: <HomeIcon />,
      items: [
        { url: '/', title: 'Open Data' },
        { url: '/', title: 'Zverejňovanie' },
        { url: '/', title: 'Majetok mesta' },
        { url: '/', title: 'Financie mesta' },
        { url: '/', title: 'Výročné správy' },
        { url: '/', title: 'Protikorupčné minimum' },
        { url: '/', title: 'Financie mesta' },
        { url: '/', title: 'Zverejňovanie' },
      ],
      dispayedItems: { number: 7, additionalUrl: '/' },
    },
    {
      title: 'Daň z nehnuteľnosti',
      icon: <HomeIcon />,
      items: [
        { url: '/', title: 'Daň za užívanie verejného priestranstva' },
        { url: '/', title: 'Daň za ubytovanie' },
        {
          url: '/',
          title: 'Poplatok za komunálny odpad a drobný stavebný odpad',
        },
      ],
    },
  ],
}: IProps) => (
  <div className={cx(className, 'bg-secondary px-20')}>
    <div className="grid grid-cols-3 gap-x-24 gap-y-10">
      {subSections.map((subSection, index) => (
        <HeaderSection {...subSection} />
      ))}
    </div>
  </div>
);

export default HeaderSections;
