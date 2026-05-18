import { forwardRef, ReactNode, Ref } from 'react'
import {
  Input as RACInput,
  InputProps as RACInputProps,
  TextField as RACTextField,
  TextFieldProps as RACTextFieldProps,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

import FieldWrapper from './_shared/_shared/FieldWrapper'
import { FieldBaseProps } from './_shared/_shared/types'

export interface TextFieldProps
  extends
    Omit<RACTextFieldProps, 'spellCheck'>,
    FieldBaseProps,
    Pick<RACInputProps, 'autoCapitalize' | 'autoCorrect' | 'spellCheck'> {
  placeholder?: string
  endIcon?: ReactNode
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16670-31120
 * Based on Konto: https://github.com/bratislava/konto.bratislava.sk/blob/df32c405c141af6ef5fef33e9e7129f7ece14840/next/src/components/fields/TextField.tsx
 */

const TextField = (
  {
    label,
    displayOptionalLabel,
    labelSize,
    helptext,
    helptextFooter,
    errorMessage,
    placeholder,
    endIcon,
    autoCapitalize,
    autoCorrect,
    spellCheck,
    autoComplete,
    ...rest
  }: TextFieldProps,
  ref: Ref<HTMLInputElement>,
) => (
  <RACTextField
    {...rest}
    isInvalid={!!errorMessage}
    validationBehavior="aria"
    className={cn('flex w-full flex-col gap-2', rest.className)}
  >
    <FieldWrapper
      label={label}
      isRequired={rest.isRequired}
      displayOptionalLabel={displayOptionalLabel}
      labelSize={labelSize}
      helptext={helptext}
      helptextFooter={helptextFooter}
      errorMessage={errorMessage}
    >
      <div className="relative">
        <RACInput
          ref={ref}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          autoComplete={autoComplete}
          data-cy={rest.name ? `input-${rest.name}` : undefined}
          className={({ isFocused, isDisabled, isInvalid }) =>
            cn(
              'w-full rounded-lg border bg-background-passive-base text-size-p-small-r text-content-passive-secondary outline-hidden lg:text-size-p-small',
              'px-3 py-2 lg:px-4 lg:py-3',
              'placeholder:text-content-passive-tertiary',
              {
                'border-border-active-default': !isInvalid && !isFocused,
                'border-border-active-focused': !isInvalid && isFocused,
                'border-border-error': isInvalid,
                'border-border-active-disabled bg-background-passive-tertiary': isDisabled,
                'hover:border-border-active-hover': !isDisabled && !isInvalid && !isFocused,
              },
            )
          }
        />
        {endIcon ? (
          <div className="absolute inset-y-0 right-0 flex items-center">{endIcon}</div>
        ) : null}
      </div>
    </FieldWrapper>
  </RACTextField>
)

export default forwardRef(TextField)
