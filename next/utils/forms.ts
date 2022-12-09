import Form from '@rjsf/core'
import { ErrorSchema, RJSFSchema } from '@rjsf/utils'
import { checkIsPhone, checkIsToken } from '@utils/api'
import { getAllPossibleJsonSchemaProperties } from '@utils/utils'
import { get, merge } from 'lodash'
import { RefObject, useEffect, useRef, useState } from 'react'

const buildRJSFError = (path: string[], errorMsg: string | undefined): ErrorSchema => {
  return path.reduceRight(
    (memo: object, arrayValue: string) => {
      const error: any = {}
      error[arrayValue] = memo
      return error
    },
    { __errors: [errorMsg || 'error'] },
  )
}

const keywords = [
  {
    keyword: 'isPhone',
    async: true,
    type: 'string',
    validate: checkIsPhone,
  },
  {
    keyword: 'isToken',
    async: true,
    type: 'string',
    validate: checkIsToken,
  },
]

const validateAsyncProperties = async (
  schema: RJSFSchema,
  data: any,
  path: string[],
): Promise<ErrorSchema> => {
  const errors = {}

  await Promise.all(
    keywords.map(async (k) => {
      if (schema[k.keyword]) {
        const value = get(data, path)
        const isValid = await k.validate(schema[k.keyword], value, data)
        if (!isValid) {
          merge(errors, buildRJSFError(path, schema[k.keyword].errorMsg))
        }
      }
    }),
  )

  const properties = getAllPossibleJsonSchemaProperties(schema)
  await Promise.all(
    Object.keys(properties).map(async (key) => {
      const childSchema = properties[key] as RJSFSchema
      merge(errors, await validateAsyncProperties(childSchema, data, [...path, key]))
    }),
  )

  return errors
}

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: any) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [state, setState] = useState({})
  const [extraErrors, setExtraErrors] = useState<ErrorSchema>({})
  // since Form can be undefined, useRef<Form> is understood as an overload of useRef returning MutableRef, which does not match expected Ref type be rjsf
  // also, our code expects directly RefObject otherwise it will complain of no `.current`
  // this is probably a bug in their typing therefore the cast
  const formRef = useRef<Form>() as RefObject<Form>

  // TODO validate
  const steps = schema?.allOf

  const isComplete = stepIndex === steps.length

  const previous = () => setStepIndex(stepIndex - 1)
  const next = async () => {
    let isValid = formRef?.current?.validateForm()
    if (schema.$async === true) {
      const errors = await validateAsyncProperties(
        currentSchema,
        formRef?.current?.state.formData,
        [],
      )
      setExtraErrors(errors)

      if (Object.keys(errors).length > 0) {
        isValid = false
      }
    }

    if (isValid) {
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
    extraErrors,
    keywords,
  }
}
