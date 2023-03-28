import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import InputField, { InputBase } from '../widget-components/InputField/InputField'

type FirstInputFieldBase = {
  FirstInputLabel: InputBase['label']
  FirstInputClassNames?: InputBase['className']
  FirstInputType?: InputBase['type']
  FirstInputPlaceholder: InputBase['placeholder']
  FirstInputErrorMessage?: InputBase['errorMessage']
  FirstInputDescription?: InputBase['helptext']
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
  SecondInputDescription?: InputBase['helptext']
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className={cx(FirstInputClassNames)}>
          <InputField
            label={FirstInputLabel}
            placeholder={FirstInputPlaceholder}
            errorMessage={FirstInputErrorMessage}
            helptext={FirstInputDescription}
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
          <div className={cx('block flex sm:hidden')}>
            <FieldErrorMessage errorMessage={FirstInputErrorMessage} />
          </div>
        </div>
        <div className={cx(SecondInputClassNames)}>
          <InputField
            label={SecondInputLabel}
            placeholder={SecondInputPlaceholder}
            errorMessage={SecondInputErrorMessage}
            type={SecondInputType}
            helptext={SecondInputDescription}
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
          <div className={cx('block flex w-full sm:hidden')}>
            <FieldErrorMessage errorMessage={SecondInputErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields at large screens */}
      <div className="flex flex-row gap-4">
        <div className={cx('flex hidden flex-col sm:block', FirstInputClassNames)}>
          <FieldErrorMessage errorMessage={FirstInputErrorMessage} />
        </div>
        <div className={cx('flex hidden flex-col sm:block', SecondInputClassNames)}>
          <FieldErrorMessage errorMessage={SecondInputErrorMessage} />
        </div>
      </div>
    </div>
  )
}
