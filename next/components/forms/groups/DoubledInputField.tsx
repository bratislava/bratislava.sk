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
    <div className="flex flex-row items-end gap-4">
      <div className="w-full">
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
          // disabled={FirstInputDisabled}
          tooltip={FirstInputTooltip}
          size={FirstInputSize}
          className={FirstInputClassNames}
          onChange={FirstInputHandler}
        />
      </div>
      <div className={SecondInputClassNames}>
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
          // disabled={SecondInputDisabled}
          size={SecondInputSize}
          tooltip={SecondInputTooltip}
          onChange={SecondInputHandler}
        />
      </div>
    </div>
  )
}
