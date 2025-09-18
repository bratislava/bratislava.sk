import { Typography } from '@bratislava/component-library'
import React, { forwardRef } from 'react'
import {
  FieldError as RACFieldError,
  Input as RACInput,
  InputProps as RACInputProps,
  Label as RACLabel,
  TextField as RACTextField,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

type Props = RACInputProps & {
  helpText?: string
  errorMessage?: string
  successMessage?: string
} & (
    | {
        labelText: string
        'aria-label'?: string
      }
    | {
        labelText?: never
        'aria-label': string
      }
  )

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16670-31120&m=dev
 */

const Input = forwardRef<HTMLInputElement, Props>(
  ({ labelText, helpText, errorMessage, successMessage, className, ...restProps }, ref) => {
    return (
      <RACTextField isInvalid={!!errorMessage} className={cn('flex flex-col gap-2', className)}>
        {labelText ? (
          <RACLabel>
            <Typography variant="h6">{labelText}</Typography>
          </RACLabel>
        ) : null}
        {helpText ? <Typography variant="p-small">{helpText}</Typography> : null}
        <RACInput
          className={cn(
            'rounded-lg border border-border-active-default px-4 py-3 outline-hidden',
            'ring-offset-2 transition hover:border-border-active-hover focus:border-border-active-focused focus-visible:ring-2',
            {
              'border-border-error hover:border-border-error-hover focus:border-border-error':
                errorMessage,
            },
          )}
          ref={ref}
          {...restProps}
        />
        <RACFieldError>
          <Typography variant="p-small" className="text-content-error-default">
            {errorMessage}
          </Typography>
        </RACFieldError>
        {successMessage ? (
          <Typography variant="p-small" className="text-content-success-default">
            {successMessage}
          </Typography>
        ) : null}
      </RACTextField>
    )
  },
)

export default Input
