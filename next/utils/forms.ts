import Form from '@rjsf/core'
import { Ref, useEffect, useRef, useState } from 'react'

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: any) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [state, setState] = useState({})
  // since Form can be undefined, useRef<Form> is understood as an overload of useRef returning MutableRef, which does not match expected Ref type be rjsf
  // this is probably a bug in their typing therefore the cast
  const formRef = useRef<Form>() as Ref<Form>

  // TODO validate
  const steps = schema?.allOf

  const isComplete = stepIndex === steps.length

  const previous = () => setStepIndex(stepIndex - 1)
  const next = () => {
    if (formRef?.current?.validateForm()) {
      formRef?.current?.submit()
    }
  }

  const currentSchema = steps[stepIndex]

  // these are used to display header
  const nextSchema = steps[stepIndex + 1]
  const previousSchema = steps[stepIndex - 1]

  // TODO consider validating steps can be merged into single schema without error on mount
  useEffect(() => {
    // effect to reset all internal state when critical input 'props' change
    setState({})
    setStepIndex(0)
  }, [eformSlug, schema])

  useEffect(() => {
    // stepIndex allowed to climb one step above the length of steps - i.e. to render a final overview or other custom components but still allow to return back
    if (stepIndex > steps.length) {
      // stepIndex larger than last step index + 1
      setStepIndex(steps.length)
    }
  }, [stepIndex, steps])

  return {
    stepIndex,
    setStepIndex, // only for testing!
    state,
    setState,
    previous,
    next,
    currentSchema,
    nextSchema,
    previousSchema,
    isComplete,
    formRef,
  }
}
