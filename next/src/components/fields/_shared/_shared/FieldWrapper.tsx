import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import {
  FieldError as RACFieldError,
  Label as RACLabel,
  Text as RACText,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

import { LabelSize } from './types'

const labelSizeStyles = {
  default: '*:text-size-p-small-r lg:*:text-size-p-small',
  h3: '*:text-size-h3-r lg:*:text-size-h3',
  h4: '*:text-size-h4-r lg:*:text-size-h4',
  h5: '*:text-size-h5-r lg:*:text-size-h5',
}

type FieldWrapperProps = {
  label?: string
  isRequired?: boolean
  displayOptionalLabel?: boolean
  labelSize?: LabelSize
  helptext?: ReactNode
  helptextFooter?: ReactNode
  errorMessage?: string
  children: ReactNode
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16670-31120
 * Based on Konto: https://github.com/bratislava/konto.bratislava.sk/blob/df32c405c141af6ef5fef33e9e7129f7ece14840/next/src/components/fields/_shared/FieldWrapper.tsx
 * - label is made optional here, because in PaginationWithInput we want to hide it and set aria-label directly
 */

const FieldWrapper = ({
  label,
  isRequired,
  displayOptionalLabel = true,
  labelSize = 'default',
  helptext,
  helptextFooter,
  errorMessage,
  children,
}: FieldWrapperProps) => {
  const { t } = useTranslation()

  // Showing "(optional)" is the default approach, but we still want to keep the door open for using
  // asterisks = hiding "(optional)", by setting displayOptionalLabel={false}
  const showOptional = displayOptionalLabel && !isRequired
  const showAsterisk = !displayOptionalLabel && isRequired

  return (
    <>
      {/* TODO There is gap-2 in Figma design, but we agreed gap-1 looks better. Keeping gap-1 until the discussion is resolved. */}
      <div className="flex flex-col gap-1">
        <RACLabel
          className={cn(
            'flex items-baseline text-content-passive-primary',
            labelSizeStyles[labelSize],
          )}
        >
          {label ? (
            <Typography as="span" className="font-semibold">
              {label}
            </Typography>
          ) : null}
          {showAsterisk ? (
            <Typography as="span" className="text-content-error-default ml-0.5 font-semibold">
              *
            </Typography>
          ) : null}
          {showOptional ? (
            <Typography variant="p-small" className="ml-1 font-normal">
              {t('FieldHeader.optional')}
            </Typography>
          ) : null}
        </RACLabel>
        {helptext ? (
          <RACText
            slot="description"
            // We change default p to div, because we sometimes render full markdown instead of simple text.
            elementType="div"
            className="text-size-p-small-r text-content-passive-secondary lg:text-size-p-small"
          >
            {helptext}
          </RACText>
        ) : null}
      </div>

      {children}

      {helptextFooter ? (
        <RACText
          slot="description"
          // We change default p to div, because we sometimes render full markdown instead of simple text.
          elementType="div"
          className="text-size-p-small-r text-content-passive-secondary lg:text-size-p-small"
        >
          {helptextFooter}
        </RACText>
      ) : null}
      <RACFieldError
        className="text-size-p-small-r text-content-error-default lg:text-size-p-small"
        data-cy="error-message"
      >
        {errorMessage}
      </RACFieldError>
    </>
  )
}

export default FieldWrapper
