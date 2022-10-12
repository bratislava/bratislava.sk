import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import { FC } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop' | 'file'
}

const Upload: FC<UploadProps> = ({ type }: UploadProps) => {

  const getButtonContent = () => {
    return (
      <div className="flex-column align-items-center flex h-14 w-36 rounded-lg bg-white py-3 px-6">
        <div className="flex flex-row">
          <UploadIcon className="mr-2 h-6 w-6 self-center text-default"/>
          <p className="text-default">Upload</p>
        </div>
      </div>
    )
  }

  const getDragAndDropContent = () => {
    return (
      <div></div>
    )
  }

  const getFileContent = () => {
    return (
      <div></div>
    )
  }

  return (
    <section className="cursor-pointer select-none">
      { /* CONTENT */
        type === 'button'
          ? getButtonContent()
          : type === 'dragAndDrop'
            ? getDragAndDropContent()
            : type === 'file'
              ? getFileContent()
              : <div/>
      }
    </section>
  )
}

export default Upload
