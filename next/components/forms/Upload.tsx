import cx from 'classnames'
import { FC } from 'react'

interface UploadProps {
  type: 'button' | 'dragAndDrop' | 'file'
}

const Upload: FC<UploadProps> = ({ type }: UploadProps) => {
  const inputClassStyles = cx(
    "",
    {
      "flex w-36 h-14 rounded-lg bg-white": type === 'button',
      "flex-column align-items-center": ['button', 'dragAndDrop'].includes(type)
    }
  )



  return (
    <section className={inputClassStyles}>

    </section>
  )
}

export default Upload
