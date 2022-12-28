import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import React from 'react'

import InputField from '../widget-components/InputField/InputField'
import Upload from '../widget-components/Upload/Upload'

interface InputBase {
  InputLabel: string
  InputType?: 'text' | 'password'
  InputPlaceholder: string
  InputErrorMessage?: string
  InputDescription?: string
  InputClassName?: string
  InputValue?: string
  InputLeftIcon?: 'person' | 'mail' | 'call' | 'lock'
  InputRequired?: boolean
  InputExplicitOptional?: boolean
  InputResetIcon?: boolean
  InputDisabled?: boolean
  InputTooltip?: string
  InputOnChange?: (value?: string) => void
}
interface UploadProps {
  UploadLabel: string
  UploadType: 'button' | 'dragAndDrop'
  UploadRequired?: boolean
  UploadMultiple?: boolean
  UploadValue?: UploadMinioFile[]
  UploadDisabled?: boolean
  UploadSizeLimit?: number
  UploadSupportedFormats?: string[]
  UploadClassName?: string
  UploadOnChange?: (value: UploadMinioFile[]) => void
}
type InputUploadBase = InputBase &
  UploadProps & {
    middleText: string
    // className prop for whole container of two another components
    className?: string
  }

export const InputUploadGroup = ({
  UploadLabel,
  InputLabel,
  InputPlaceholder,
  InputOnChange,
  InputDescription,
  InputDisabled,
  InputRequired,
  InputClassName,
  InputErrorMessage,
  InputValue,
  InputType,
  InputExplicitOptional,
  InputTooltip,
  InputLeftIcon,
  InputResetIcon,
  middleText,
  className,
  UploadDisabled,
  UploadRequired,
  UploadOnChange,
  UploadMultiple,
  UploadClassName,
  UploadType,
  UploadValue,
  UploadSizeLimit,
  UploadSupportedFormats,
}: InputUploadBase) => {
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <InputField
        label={InputLabel}
        placeholder={InputPlaceholder}
        description={InputDescription}
        disabled={InputDisabled}
        required={InputRequired}
        errorMessage={InputErrorMessage}
        value={InputValue}
        type={InputType}
        explicitOptional={InputExplicitOptional}
        tooltip={InputTooltip}
        leftIcon={InputLeftIcon}
        resetIcon={InputResetIcon}
        className={InputClassName}
        onChange={InputOnChange}
      />
      <div>{middleText}</div>
      <Upload
        label={UploadLabel}
        type={UploadType}
        sizeLimit={UploadSizeLimit}
        supportedFormats={UploadSupportedFormats}
        required={UploadRequired}
        value={UploadValue}
        onChange={UploadOnChange}
        disabled={UploadDisabled}
        multiple={UploadMultiple}
        className={UploadClassName}
      />
    </div>
  )
}
