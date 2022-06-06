import cx from 'classnames';
import { DownloadCard, DownloadCardProps } from '../DownloadCard/DownloadCard';
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper';

export interface DownloadCardsProps {
  className?: string;
  downloads: DownloadCardProps[];
}

export const DownloadCards = ({ className, downloads }: DownloadCardsProps) => {
  return (
    <HorizontalScrollWrapper
      className={cx(
        'space-x-8 md:space-x-0 md:grid md:grid-cols-3 md:gap-8',
        className
      )}
    >
      {downloads?.map((download, index) => (
        <DownloadCard key={index} {...download} />
      ))}
    </HorizontalScrollWrapper>
  );
};

export default DownloadCards;
