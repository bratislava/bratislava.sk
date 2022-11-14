import cx from 'classnames'

import { Download } from '../../../assets/images'
import { Panel } from '../Panel/Panel'

export interface DownloadCardProps {
  className?: string
  containerClassName?: string
  // icon?: 'download';
  title?: string
  uploadDate?: string
  downloadDetail?: string
  downloadLink?: string
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
    <a href={downloadLink} className={containerClassName} target="_blank" rel="noreferrer">
      <Panel
        hoverable
        className={cx(
          className,
          'py-6 px-5 space-y-4 border-4 border-transparent hover:border-primary md:min-h-[154px]'
        )}
      >
        <div className=" flex items-end space-x-5 lg:space-x-8">
          <span className="text-p2 max-h-24 w-[250px] overflow-hidden">{title}</span>
          <span className="flex h-[88px] items-end justify-end text-primary">
            <Download />
          </span>
        </div>

        <div className="mt-5 flex justify-between text-p3 opacity-50">
          <span>{uploadDate}</span>
          <span>{downloadDetail}</span>
        </div>
      </Panel>
    </a>
  )
}

export default DownloadCard
