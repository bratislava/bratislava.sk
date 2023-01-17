import cx from 'classnames'

import TextAreaField, { TextAreaBase } from '../widget-components/TextAreaField/TextAreaField'
import Upload, { UploadProps } from '../widget-components/Upload/Upload'

interface TextAreaBaseProps {
  TextareaLabel: TextAreaBase['label']
  TextareaPlaceholder?: TextAreaBase['placeholder']
  TextareaErrorMessage?: TextAreaBase['errorMessage']
  TextareaDescription?: TextAreaBase['description']
  TextareaClassName?: TextAreaBase['className']
  TextareaDefaultValue?: TextAreaBase['defaultValue']
  TextareaValue?: TextAreaBase['value']
  TextareaRequired?: TextAreaBase['required']
  TextareaExplicitOptional?: TextAreaBase['explicitOptional']
  TextareaDisabled?: TextAreaBase['disabled']
  TextareaTooltip?: TextAreaBase['tooltip']
  TextareaOnChange?: TextAreaBase['onChange']
}

interface UploadBaseProps {
  UploadLabel: UploadProps['label']
  UploadType: UploadProps['type']
  UploadMultiple?: UploadProps['multiple']
  UploadValue?: UploadProps['value']
  UploadDisabled?: UploadProps['disabled']
  UploadRequired?: UploadProps['required']
  UploadSizeLimit?: UploadProps['sizeLimit']
  UploadSupportedFormats?: UploadProps['supportedFormats']
  UploadClassName?: UploadProps['className']
  UploadErrorMessage?: UploadProps['errorMessage']
  UploadOnChange?: UploadProps['onChange']
}

type TextareaUploadBase = TextAreaBaseProps &
  UploadBaseProps & {
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
