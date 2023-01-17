import cx from 'classnames'
import React from 'react'

import InputField, { InputBase } from '../widget-components/InputField/InputField'
import Upload, { UploadProps } from '../widget-components/Upload/Upload'

interface InputBaseProps {
  InputLabel: InputBase['label']
  InputType?: InputBase['type']
  InputPlaceholder: InputBase['placeholder']
  InputErrorMessage?: InputBase['errorMessage']
  InputDescription?: InputBase['description']
  InputClassName?: InputBase['className']
  InputValue?: InputBase['value']
  InputLeftIcon?: InputBase['leftIcon']
  InputRequired?: InputBase['required']
  InputExplicitOptional?: InputBase['explicitOptional']
  InputResetIcon?: InputBase['resetIcon']
  InputDisabled?: InputBase['disabled']
  InputTooltip?: InputBase['tooltip']
  InputOnChange?: InputBase['onChange']
}

interface UploadBaseProps {
  UploadLabel: UploadProps['label']
  UploadType: UploadProps['type']
  UploadRequired?: UploadProps['required']
  UploadMultiple?: UploadProps['multiple']
  UploadValue?: UploadProps['value']
  UploadDisabled?: UploadProps['disabled']
  UploadSizeLimit?: UploadProps['sizeLimit']
  UploadSupportedFormats?: UploadProps['supportedFormats']
  UploadClassName?: UploadProps['className']
  UploadErrorMessage?: UploadProps['errorMessage']
  UploadOnChange?: UploadProps['onChange']
}

type InputUploadBase = InputBaseProps &
  UploadBaseProps & {
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
  UploadErrorMessage,
}: InputUploadBase) => {
  const supportedFormats =
    UploadSupportedFormats && UploadSupportedFormats.length > 0 ? UploadSupportedFormats : undefined

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
        supportedFormats={supportedFormats}
        required={UploadRequired}
        value={UploadValue}
        onChange={UploadOnChange}
        disabled={UploadDisabled}
        multiple={UploadMultiple}
        errorMessage={UploadErrorMessage}
        className={UploadClassName}
      />
    </div>
  )
}
