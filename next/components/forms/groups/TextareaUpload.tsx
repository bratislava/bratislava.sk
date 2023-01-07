import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'

import TextAreaField from '../widget-components/TextAreaField/TextAreaField'
import Upload from '../widget-components/Upload/Upload'

interface TextAreaBase {
  TextareaLabel: string
  TextareaPlaceholder?: string
  TextareaErrorMessage?: string[]
  TextareaDescription?: string
  TextareaClassName?: string
  TextareaDefaultValue?: string
  TextareaValue?: string
  TextareaRequired?: boolean
  TextareaExplicitOptional?: boolean
  TextareaDisabled?: boolean
  TextareaTooltip?: string
  TextareaOnChange?: (value?: string) => void
}

interface UploadProps {
  UploadLabel: string
  UploadType: 'button' | 'dragAndDrop'
  UploadMultiple?: boolean
  UploadValue?: UploadMinioFile[]
  UploadDisabled?: boolean
  UploadRequired?: boolean
  UploadSizeLimit?: number
  UploadSupportedFormats?: string[]
  UploadClassName?: string
  UploadErrorMessage?: string[]
  UploadOnChange?: (value: UploadMinioFile[]) => void
}

type TextareaUploadBase = TextAreaBase &
  UploadProps & {
    middleText: string
    // className prop for whole container of two another components
    className?: string
  }

export const TextareaUploadGroup = ({
  TextareaLabel,
  TextareaOnChange,
  TextareaDescription,
  TextareaPlaceholder,
  TextareaDisabled,
  TextareaTooltip,
  TextareaClassName,
  TextareaRequired,
  TextareaValue,
  TextareaErrorMessage,
  TextareaExplicitOptional,
  middleText,
  UploadLabel,
  UploadDisabled,
  UploadOnChange,
  UploadMultiple,
  UploadClassName,
  UploadRequired,
  UploadType,
  UploadValue,
  UploadSizeLimit,
  UploadSupportedFormats,
  UploadErrorMessage,
  className,
}: TextareaUploadBase) => {
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <TextAreaField
        label={TextareaLabel}
        placeholder={TextareaPlaceholder}
        className={TextareaClassName}
        tooltip={TextareaTooltip}
        required={TextareaRequired}
        value={TextareaValue}
        errorMessage={TextareaErrorMessage}
        explicitOptional={TextareaExplicitOptional}
        disabled={TextareaDisabled}
        description={TextareaDescription}
        onChange={TextareaOnChange}
      />
      <div>{middleText}</div>
      <Upload
        label={UploadLabel}
        type={UploadType}
        sizeLimit={UploadSizeLimit}
        supportedFormats={UploadSupportedFormats}
        value={UploadValue}
        onChange={UploadOnChange}
        disabled={UploadDisabled}
        multiple={UploadMultiple}
        required={UploadRequired}
        errorMessage={UploadErrorMessage}
        className={UploadClassName}
      />
    </div>
  )
}
