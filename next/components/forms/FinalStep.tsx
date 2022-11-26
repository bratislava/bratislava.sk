import { ApiError, submitEform } from '@utils/api'
import { ErrorObject } from 'ajv'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import Button from './Button'

interface FinalStepProps {
  state: Record<string, any>
  slug: string
}

// TODO styling + edit state type according to styling as needed
// TODO find out if we need to submit to multiple different endpoints and allow configuration if so
export const FinalStep = ({ state, slug }: FinalStepProps) => {
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
  // TODO render according to design
  return (
    <div>
      <h1>Final step placeholder</h1>
      {Object.keys(state).map((key) => (
        <p>
          {key}: {JSON.stringify(state[key])}
        </p>
      ))}
      {successMessage && <p>{successMessage}</p>}
      {!!errors?.length && errors.map((error) => <p className="text-error">{JSON.stringify(error)}</p>)}
      {/* TODO figure out if we should turn off eslint no-misused-promises for these cases (or altogether) */}
      <Button onPress={submit} text="Submit" />
    </div>
  )
}

export default FinalStep
