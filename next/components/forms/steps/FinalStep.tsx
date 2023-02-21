import { ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { ApiError, submitEform } from '@utils/api'
import { ErrorObject } from 'ajv'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import Button from '../simple-components/Button'
import Summary from './Summary/Summary'
import SummaryMessages from './Summary/SummaryMessages'

interface FinalStepProps {
  formData: Record<string, any>
  formErrors: RJSFValidationError[][]
  extraErrors: ErrorSchema
  schema?: StrictRJSFSchema
  slug: string
  onGoToStep: (step: number) => void
  onGoToPreviousStep: () => void
}

// TODO find out if we need to submit to multiple different endpoints and allow configuration if so
export const FinalStep = ({
  formData,
  formErrors,
  extraErrors,
  schema,
  slug,
  onGoToStep,
  onGoToPreviousStep,
}: FinalStepProps) => {
  const { t } = useTranslation('forms')
  const [errors, setErrors] = useState<Array<ErrorObject | string>>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const submit = async () => {
    try {
      // TODO do something more with the result then just showing success
      const result = await submitEform(slug, formData)
      setErrors([])
      setSuccessMessage(t('success'))
    } catch (error) {
      console.log('Form submission error')
      console.log(error)
      if (error instanceof ApiError) {
        setErrors(error.errors)
      } else if (error instanceof Error) {
        setErrors([t([`errors.${error?.message}`, 'errors.unknown'])])
      } else {
        setErrors([t('errors.unknown')])
      }
    }
  }

  if (typeof formData !== 'object' || formData == null) {
    return null
  }

  return (
    <div>
      <h1 className="text-[48px] font-semibold">{t('summary')}</h1>
      <Summary
        schema={schema}
        formData={formData}
        formErrors={formErrors}
        extraErrors={extraErrors}
        onGoToStep={onGoToStep}
      />
      <SummaryMessages errors={errors} successMessage={successMessage} />
      {/* TODO figure out if we should turn off eslint no-misused-promises for these cases (or altogether) */}
      <div className="flex flex-row gap-3">
        <Button onPress={onGoToPreviousStep} text="Previous" />
        <Button onPress={submit} text={t('submit')} />
      </div>
    </div>
  )
}

export default FinalStep
