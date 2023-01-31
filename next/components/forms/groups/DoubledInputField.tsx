import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import InputField, { InputBase } from '../widget-components/InputField/InputField'

type FirstInputFieldBase = {
  FirstInputLabel: InputBase['label']
  FirstInputClassNames?: InputBase['className']
  FirstInputType?: InputBase['type']
  FirstInputPlaceholder: InputBase['placeholder']
  FirstInputErrorMessage?: InputBase['errorMessage']
  FirstInputDescription?: InputBase['description']
  FirstInputValue?: InputBase['value']
  FirstInputLeftIcon?: InputBase['leftIcon']
  FirstInputRequired?: InputBase['required']
  FirstInputExplicitOptional?: InputBase['explicitOptional']
  FirstInputResetIcon?: InputBase['resetIcon']
  FirstInputDisabled?: InputBase['disabled']
  FirstInputSize?: InputBase['size']
  FirstInputTooltip?: InputBase['tooltip']
  FirstInputHandler?: InputBase['onChange']
}

type SecondInputFieldBase = {
  SecondInputLabel: InputBase['label']
  SecondInputClassNames?: InputBase['className']
  SecondInputType?: InputBase['type']
  SecondInputPlaceholder: InputBase['placeholder']
  SecondInputErrorMessage?: InputBase['errorMessage']
  SecondInputDescription?: InputBase['description']
  SecondInputValue?: InputBase['value']
  SecondInputLeftIcon?: InputBase['leftIcon']
  SecondInputRequired?: InputBase['required']
  SecondInputExplicitOptional?: InputBase['explicitOptional']
  SecondInputResetIcon?: InputBase['resetIcon']
  SecondInputDisabled?: InputBase['disabled']
  SecondInputSize?: InputBase['size']
  SecondInputTooltip?: InputBase['tooltip']
  SecondInputHandler?: InputBase['onChange']
}

export const DoubledInputField = ({
  FirstInputLabel,
  SecondInputLabel,
  FirstInputClassNames,
  SecondInputClassNames,
  FirstInputType,
  SecondInputType,
  FirstInputPlaceholder,
  SecondInputPlaceholder,
  FirstInputDescription,
  SecondInputDescription,
  FirstInputValue,
  SecondInputValue,
  FirstInputLeftIcon,
  SecondInputLeftIcon,
  FirstInputRequired,
  SecondInputRequired,
  FirstInputExplicitOptional,
  SecondInputExplicitOptional,
  FirstInputResetIcon,
  SecondInputResetIcon,
  FirstInputDisabled,
  SecondInputDisabled,
  FirstInputTooltip,
  SecondInputTooltip,
  FirstInputHandler,
  SecondInputHandler,
  FirstInputSize,
  SecondInputSize,
  FirstInputErrorMessage,
  SecondInputErrorMessage,
}: FirstInputFieldBase & SecondInputFieldBase) => {
  return (
    <div className="flex flex-col">
      <div className="flex sm:flex-row flex-col gap-4 sm:items-end">
        <div className={cx(FirstInputClassNames)}>
          <InputField
            label={FirstInputLabel}
            placeholder={FirstInputPlaceholder}
            errorMessage={FirstInputErrorMessage}
            description={FirstInputDescription}
            type={FirstInputType}
            value={FirstInputValue}
            leftIcon={FirstInputLeftIcon}
            required={FirstInputRequired}
            explicitOptional={FirstInputExplicitOptional}
            resetIcon={FirstInputResetIcon}
            disabled={FirstInputDisabled}
            customErrorPlace
            tooltip={FirstInputTooltip}
            size={FirstInputSize}
            className={FirstInputClassNames}
            onChange={FirstInputHandler}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex sm:hidden block')}>
            <FieldErrorMessage errorMessage={FirstInputErrorMessage} />
          </div>
        </div>
        <div className={cx(SecondInputClassNames)}>
          <InputField
            label={SecondInputLabel}
            placeholder={SecondInputPlaceholder}
            errorMessage={SecondInputErrorMessage}
            type={SecondInputType}
            description={SecondInputDescription}
            value={SecondInputValue}
            leftIcon={SecondInputLeftIcon}
            required={SecondInputRequired}
            explicitOptional={SecondInputExplicitOptional}
            resetIcon={SecondInputResetIcon}
            customErrorPlace
            disabled={SecondInputDisabled}
            size={SecondInputSize}
            tooltip={SecondInputTooltip}
            onChange={SecondInputHandler}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex sm:hidden w-full block')}>
            <FieldErrorMessage errorMessage={SecondInputErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields at large screens */}
      <div className="flex-row flex gap-4">
        <div className={cx('flex flex-col sm:block hidden', FirstInputClassNames)}>
          <FieldErrorMessage errorMessage={FirstInputErrorMessage} />
        </div>
        <div className={cx('flex flex-col sm:block hidden', SecondInputClassNames)}>
          <FieldErrorMessage errorMessage={SecondInputErrorMessage} />
        </div>
      </div>
    </div>
  )
}
