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

export const FileCard = ({ className, fileTitle, uploadDate, fileDetail, downloadLink }: FileCardProps) => {
  return (
    <a href={downloadLink} target="_blank" rel="noreferrer" download>
      <Panel className={cx(className, 'flex flex-row md:flex-col px-5 justify-between')} hoverable>
        <div className="hidden md:flex justify-end mt-5 text-primary">
          <Download className="text-red-brick" />
        </div>

        <div className="font-normal text-sm my-5 md:mt-0 md:mb-5">
          {fileTitle}
          <div
            className={cx(
              'flex flex-col mt-4 text-xs opacity-50 space-y-1',
              'md:flex-row md:justify-between md:space-y-0'
            )}
          >
            <span>{uploadDate}</span>
            <span>{fileDetail}</span>
          </div>
        </div>

        <div className="flex md:hidden items-end mb-5 text-primary">
          <Download className="text-red-brick" />
        </div>
      </Panel>
    </a>
  )
}

export default FileCard
