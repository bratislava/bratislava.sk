import InputField, { LeftIconVariants } from '../widget-components/InputField/InputField'

interface InputBase {
  // label
  FirstInputLabel: string
  SecondInputLabel: string

  // className
  FirstInputClassNames?: string
  SecondInputClassNames?: string

  // type
  FirstInputType?: 'text' | 'password'
  SecondInputType?: 'text' | 'password'

  // placeholder
  FirstInputPlaceholder: string
  SecondInputPlaceholder: string

  // errors
  FirstInputErrorMessage?: string[]
  SecondInputErrorMessage?: string[]

  // description
  FirstInputDescription?: string
  SecondInputDescription?: string

  // value
  FirstInputValue?: string
  SecondInputValue?: string

  // leftIcon
  FirstInputLeftIcon?: LeftIconVariants
  SecondInputLeftIcon?: LeftIconVariants

  // required
  FirstInputRequired?: boolean
  SecondInputRequired?: boolean

  // optional
  FirstInputExplicitOptional?: boolean
  SecondInputExplicitOptional?: boolean

  // resetIcon
  FirstInputResetIcon?: boolean
  SecondInputResetIcon?: boolean

  // disabled
  FirstInputDisabled?: boolean
  SecondInputDisabled?: boolean

  // tooltip
  FirstInputTooltip?: string
  SecondInputTooltip?: string

  // handler
  FirstInputHandler?: (value?: string) => void
  SecondInputHandler?: (value?: string) => void
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
  FirstInputErrorMessage,
  SecondInputErrorMessage,
}: InputBase) => {
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
          tooltip={SecondInputTooltip}
          onChange={SecondInputHandler}
        />
      </div>
    </div>
  )
}
