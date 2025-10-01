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
  helptext?: string
  errorMessage?: string
} & (
    | {
        label: string
        'aria-label'?: string
      }
    | {
        label?: never
        'aria-label': string
      }
  )

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16670-31120&m=dev
 */

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, helptext, errorMessage, className, ...restProps }, ref) => {
    return (
      <RACTextField isInvalid={!!errorMessage} className={cn('flex flex-col gap-2', className)}>
        {label ? (
          <RACLabel>
            <Typography variant="h6">{label}</Typography>
          </RACLabel>
        ) : null}
        {helptext ? <Typography variant="p-small">{helptext}</Typography> : null}
        <RACInput
          className={cn(
            'base-focus-ring rounded-lg border border-border-active-default px-4 py-3 outline-hidden hover:border-border-active-hover',
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
      </RACTextField>
    )
  },
)

export default Input
