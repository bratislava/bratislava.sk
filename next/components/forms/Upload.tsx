import UploadIcon from '@assets/images/forms/upload-icon.svg'
import cx from 'classnames'
import { FC } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop' | 'file'
}

const Upload: FC<UploadProps> = ({ type }: UploadProps) => {
  const inputClassStyles = cx(
    "",
    {
      "flex w-36 h-14 rounded-lg bg-white py-3 px-6": type === 'button',
      "flex-column align-items-center": ['button', 'dragAndDrop'].includes(type)
    }
  )

  const getButtonContent = () => {
    return (
      <div className="flex flex-row">
        <UploadIcon/>
        <p className="text-default">Upload</p>
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
    <section className={inputClassStyles}>
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
