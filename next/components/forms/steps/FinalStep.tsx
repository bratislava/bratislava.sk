import { JsonSchema } from '@backend/utils/forms'
import { ApiError, submitEform } from '@utils/api'
import { ErrorObject } from 'ajv'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import Button from '../simple-components/Button'
import StepSummaryRows from './Summary/StepSummaryRows'

interface FinalStepProps {
  state: Record<string, any>
  schema?: JsonSchema[]
  slug: string
}

// TODO find out if we need to submit to multiple different endpoints and allow configuration if so
export const FinalStep = ({ state, schema, slug }: FinalStepProps) => {
  const { t } = useTranslation('forms')
  const [errors, setErrors] = useState<Array<ErrorObject | string>>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const submit = async () => {
    try {
      // TODO do something more with the result then just showing success
      const result = await submitEform(slug, state)
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

  if (typeof state !== 'object' || state == null) {
    return null
  }

  return (
    <div>
      <h1>Final step placeholder</h1>
      {schema?.map((step, key) => {
        return <StepSummaryRows key={key} step={step} stateData={state} />
      })}
      {successMessage && <p>{successMessage}</p>}
      {!!errors?.length &&
        errors.map((error) => <p className="text-error">{JSON.stringify(error)}</p>)}
      {/* TODO figure out if we should turn off eslint no-misused-promises for these cases (or altogether) */}
      <Button onPress={submit} text="Submit" />
    </div>
  )
}

export default FinalStep
