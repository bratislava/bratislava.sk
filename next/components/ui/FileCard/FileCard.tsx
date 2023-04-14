import { Download } from '@assets/images'
import cx from 'classnames'

import { Panel } from '../Panel/Panel'

export interface FileCardProps {
  className?: string
  fileTitle?: string
  fileDetail?: string
  uploadDate: string
  downloadLink?: string
}

export const FileCard = ({
  className,
  fileTitle,
  uploadDate,
  fileDetail,
  downloadLink,
}: FileCardProps) => {
  return (
    <a href={downloadLink} target="_blank" rel="noreferrer" download>
      <Panel className={cx(className, 'flex flex-row justify-between px-5 md:flex-col')} hoverable>
        <div className="mt-5 hidden justify-end text-category-600 md:flex">
          <Download className="text-red-brick" />
        </div>

        <div className="text-default my-5 md:mb-5 md:mt-0">
          {fileTitle}
          <div
            className={cx(
              'text-small mt-4 flex flex-col space-y-1 opacity-50',
              'md:flex-row md:justify-between md:space-y-0',
            )}
          >
            <span>{uploadDate}</span>
            <span>{fileDetail}</span>
          </div>
        </div>

        <div className="mb-5 flex items-end text-category-600 md:hidden">
          <Download className="text-red-brick" />
        </div>
      </Panel>
    </a>
  )
}

export default FileCard
