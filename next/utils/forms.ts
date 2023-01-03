import Form from '@rjsf/core'
import { RJSFSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { RefObject, useEffect, useRef, useState } from 'react'

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: StrictRJSFSchema) => {
  // since Form can be undefined, useRef<Form> is understood as an overload of useRef returning MutableRef, which does not match expected Ref type be rjsf
  // also, our code expects directly RefObject otherwise it will complain of no `.current`
  // this is probably a bug in their typing therefore the cast
  const formRef = useRef<Form>() as RefObject<Form>

  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState<RJSFSchema>({})
  const [errors, setErrors] = useState<RJSFValidationError[][]>([])

  const steps = schema?.allOf
  const stepsLength: number = steps?.length ?? -1
  const isComplete = stepIndex === stepsLength

  const currentSchema = steps ? (steps[stepIndex] as RJSFSchema) : {}
  const nextSchema = steps ? (steps[stepIndex + 1] as RJSFSchema) : {}
  const previousSchema = steps ? (steps[stepIndex - 1] as RJSFSchema) : {}

  console.log('FORM DATA:', formData)

  useEffect(() => {
    // effect to reset all internal state when critical input 'props' change
    setFormData({})
    setStepIndex(0)
  }, [eformSlug, schema])

  useEffect(() => {
    // stepIndex allowed to climb one step above the length of steps - i.e. to render a final overview or other custom components but still allow to return back
    if (stepIndex > stepsLength) {
      // stepIndex larger than last step index + 1
      setStepIndex(stepsLength)
    }
  }, [stepIndex, steps, stepsLength])

  const previous = () => setStepIndex(stepIndex - 1)
  const next = () => setStepIndex(stepIndex + 1)

  const setStepFormData = (stepFormData: RJSFSchema) => {
    const newState = { ...formData }
    Object.entries(stepFormData).forEach(([key, value]: [string, RJSFSchema]) => {
      newState[key] = value
    })
    setFormData(newState)
  }

  const setUniqueErrors = (newErrors: RJSFValidationError[], actualStepIndex: number) => {
    let updatedErrors: RJSFValidationError[][] = []
    if (errors.length === actualStepIndex) {
      updatedErrors = [...errors]
      updatedErrors.push(newErrors)
    } else if (errors.length > actualStepIndex) {
      updatedErrors = errors.map((innerErrors: RJSFValidationError[], index: number) =>
        index === actualStepIndex ? [...newErrors] : [...innerErrors],
      )
    }
    setErrors(updatedErrors)
  }

  const validate = () => {
    if (formRef?.current?.validate) {
      formRef?.current?.validateForm()
    }
  }

  return {
    stepIndex,
    setStepIndex, // only for testing!
    formData,
    setState: setFormData,
    setStepFormData,
    errors,
    validate,
    setErrors: setUniqueErrors,
    previous,
    next,
    currentSchema,
    nextSchema,
    previousSchema,
    isComplete,
    formRef,
  }
}
