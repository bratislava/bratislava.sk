import cx from 'classnames'

import { Download } from '../../../assets/images'
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
      <Panel className={cx(className, 'flex flex-row md:flex-col px-5 justify-between')} hoverable>
        <div className="mt-5 hidden justify-end text-primary md:flex">
          <Download className="text-red-brick" />
        </div>

        <div className="my-5 text-p2 font-normal md:mt-0 md:mb-5">
          {fileTitle}
          <div
            className={cx(
              'flex flex-col mt-4 text-p3 opacity-50 space-y-1',
              'md:flex-row md:justify-between md:space-y-0'
            )}
          >
            <span>{uploadDate}</span>
            <span>{fileDetail}</span>
          </div>
        </div>

        <div className="mb-5 flex items-end text-primary md:hidden">
          <Download className="text-red-brick" />
        </div>
      </Panel>
    </a>
  )
}

export default FileCard
