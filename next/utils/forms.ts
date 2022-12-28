import Form from '@rjsf/core'
import { RJSFSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { RefObject, useEffect, useRef, useState } from 'react'

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: StrictRJSFSchema) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [state, setState] = useState({})

  const [errors, setErrors] = useState<RJSFValidationError[][]>([])

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

  console.log('DATA:', state)

  // since Form can be undefined, useRef<Form> is understood as an overload of useRef returning MutableRef, which does not match expected Ref type be rjsf
  // also, our code expects directly RefObject otherwise it will complain of no `.current`
  // this is probably a bug in their typing therefore the cast
  const formRef = useRef<Form>() as RefObject<Form>

  // TODO validate
  const steps = schema?.allOf
  const stepsLength: number = steps?.length ?? -1
  const isComplete = stepIndex === stepsLength

  const previous = () => setStepIndex(stepIndex - 1)
  const next = () => {
    formRef?.current?.validateForm()
    formRef?.current?.submit()
  }

  const forceNext = () => {
    formRef?.current?.submit()
  }

  const currentSchema = steps ? (steps[stepIndex] as RJSFSchema) : {}

  // these are used to display header
  const nextSchema = steps ? (steps[stepIndex + 1] as RJSFSchema) : {}
  const previousSchema = steps ? (steps[stepIndex - 1] as RJSFSchema) : {}

  // TODO consider validating steps can be merged into single schema without error on mount
  useEffect(() => {
    // effect to reset all internal state when critical input 'props' change
    setState({})
    setStepIndex(0)
  }, [eformSlug, schema])

  useEffect(() => {
    // stepIndex allowed to climb one step above the length of steps - i.e. to render a final overview or other custom components but still allow to return back
    if (stepIndex > stepsLength) {
      // stepIndex larger than last step index + 1
      setStepIndex(stepsLength)
    }
  }, [stepIndex, steps, stepsLength])

  return {
    stepIndex,
    setStepIndex, // only for testing!
    state,
    setState,
    errors,
    setErrors: setUniqueErrors,
    previous,
    next,
    forceNext,
    currentSchema,
    nextSchema,
    previousSchema,
    isComplete,
    formRef,
  }
}
