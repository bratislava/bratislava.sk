import cx from 'classnames';
import { Panel } from '../Panel/Panel';
import { Download } from '../../assets/images';

export interface DownloadCardProps {
  className?: string;
  containerClassName?: string;
  // icon?: 'download';
  title?: string;
  uploadDate?: string;
  downloadDetail?: string;
  downloadLink?: string;
}

export const DownloadCard = ({
  className,
  containerClassName,
  // icon,
  title,
  uploadDate,
  downloadDetail,
  downloadLink,
}: DownloadCardProps) => {
  return (
    <a
      href={downloadLink}
      className={containerClassName}
      target="_blank"
      rel="noreferrer"
    >
      <Panel
        hoverable
        className={cx(
          className,
          'py-6 px-5 space-y-4 border-4 border-transparent hover:border-primary md:min-h-[154px]'
        )}
      >
        <div className=" flex space-x-5 lg:space-x-8 items-end">
          <span className="text-sm font-normal max-h-[96px] w-[250px] overflow-hidden">
            {title}
          </span>
          <span className="flex text-primary justify-end items-end h-[88px]">
            <Download />
          </span>
        </div>

        <div className="flex justify-between mt-5 text-xs opacity-50">
          <span>{uploadDate}</span>
          <span>{downloadDetail}</span>
        </div>
      </Panel>
    </a>
  );
};

export default DownloadCard;
