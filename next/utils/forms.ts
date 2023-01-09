import Form from '@rjsf/core'
import { ErrorSchema, RJSFSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { validateKeyword } from '@utils/api'
import { AnySchemaObject, FuncKeywordDefinition } from 'ajv'
import { JSONSchema7Definition } from 'json-schema'
import { forEach, get, merge } from 'lodash'
import { RefObject, useEffect, useRef, useState } from 'react'

export type JsonSchema = JSONSchema7Definition
interface JsonSchemaProperties {
  [key: string]: JSONSchema7Definition
}

export const getAllPossibleJsonSchemaProperties = (
  jsonSchema: JsonSchema | undefined,
): JsonSchemaProperties => {
  if (!jsonSchema || jsonSchema === true) {
    return {}
  }

  const properties: JsonSchemaProperties = jsonSchema.properties ?? {}

  if (jsonSchema.then) {
    Object.assign(properties, getAllPossibleJsonSchemaProperties(jsonSchema.then))
  }
  if (jsonSchema.else) {
    Object.assign(properties, getAllPossibleJsonSchemaProperties(jsonSchema.else))
  }
  if (jsonSchema.allOf) {
    jsonSchema.allOf.forEach((s) => {
      Object.assign(properties, getAllPossibleJsonSchemaProperties(s))
    })
  }
  if (jsonSchema.oneOf) {
    jsonSchema.oneOf.forEach((s) => {
      Object.assign(properties, getAllPossibleJsonSchemaProperties(s))
    })
  }
  if (jsonSchema.anyOf) {
    jsonSchema.anyOf.forEach((s) => {
      Object.assign(properties, getAllPossibleJsonSchemaProperties(s))
    })
  }

  return properties
}

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

const exampleAsyncValidation = (
  schema: any,
  value: any,
  parentSchema?: AnySchemaObject,
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(!!value), 500)
  })
}

interface KeywordDefinition extends FuncKeywordDefinition {
  validate?: (schema: any, value: any, parentSchema?: AnySchemaObject) => boolean | Promise<boolean>
}

export const ajvKeywords: KeywordDefinition[] = [
  {
    keyword: 'isExampleAsyncValidation',
    async: true,
    type: 'string',
    validate: exampleAsyncValidation,
  },
  {
    keyword: 'example',
  },
]

const validateAsyncProperties = async (
  schema: RJSFSchema,
  data: any,
  path: string[],
): Promise<ErrorSchema> => {
  const errors = {}

  await Promise.all(
    ajvKeywords.map(async (k: KeywordDefinition) => {
      const keyword: string = k.keyword as string
      if (k.async === true && schema[keyword]) {
        const isValid = await validateKeyword(keyword, schema[keyword], get(data, path), schema)
        if (!isValid) {
          merge(errors, buildRJSFError(path, schema[keyword].errorMsg))
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

export const getLabel = (schemaArray: JsonSchema[], fieldName: string): string => {
  // need to find title of field in schema
  let label = fieldName
  for (const item of schemaArray) {
    if (Array.isArray(item)) {
      // if item is array, use recursively this function on it
      label = getLabel(item, fieldName)
    } else if (item && typeof item === 'object' && !Object.keys(item).includes(fieldName)) {
      // if item is object and it has not fieldName we are finding, use recursively this function on array of values
      const itemValues: JsonSchema[] = Object.values(item)
      label = getLabel(itemValues, fieldName)
    } else if (item && typeof item === 'object') {
      // if item is object, includes fieldName we are finding, take value of fieldName and save title
      const fieldValue: [string, JsonSchema] | undefined = Object.entries(item).find(
        ([nestedFieldName]) => nestedFieldName === fieldName,
      )
      if (fieldValue && fieldValue[1] && typeof fieldValue[1] !== 'boolean') {
        label = fieldValue[1].title ?? fieldName
      }
    }
    if (label !== fieldName) {
      // if label is different from fieldName, return it and end recursion
      return label
    }
  }
  return label
}

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
  const [extraErrors, setExtraErrors] = useState<ErrorSchema>({})

  const steps = schema?.allOf
  const stepsLength: number = steps?.length ?? -1
  const isComplete = stepIndex === stepsLength

  const currentSchema = steps ? (steps[stepIndex] as RJSFSchema) : {}

  console.log('FORM DATA:', formData)
  console.log('ERRORS:', errors)

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

  const validate = (): boolean | undefined => {
    return formRef?.current?.validateForm()

    // if (schema.$async === true) {
    //   const newExtraErrors = await validateAsyncProperties(
    //     currentSchema,
    //     formRef?.current?.state.formData,
    //     [],
    //   )
    //   setExtraErrors(newExtraErrors)
    // }
  }

  const increaseStepErrors = () => {
    if (stepIndex - 1 === errors.length) {
      setErrors([...errors, []])
    }
  }

  const previous = () => setStepIndex(stepIndex - 1)
  const next = () => setStepIndex(stepIndex + 1)

  const submitStep = () => formRef?.current?.submit()
  const skipStep = () => {
    submitStep()
    next()
  }

  const setStepFormData = (stepFormData: RJSFSchema) => {
    const newState = { ...formData }
    Object.entries(stepFormData).forEach(([key, value]: [string, RJSFSchema]) => {
      newState[key] = value
    })
    setFormData(newState)
  }

  const setUniqueErrors = (newErrors: RJSFValidationError[], actualStepIndex: number) => {
    const updatedErrors: RJSFValidationError[][] = []
    const stepsRange = [...Array.from({ length: stepIndex + 1 }).keys()]

    stepsRange.forEach((id) => {
      const stepErrors = errors[id]
      if (id === actualStepIndex) {
        updatedErrors.push([...newErrors])
      } else if (stepErrors) {
        updatedErrors.push([...stepErrors])
      } else {
        updatedErrors.push([])
      }
    })

    setErrors(updatedErrors)
  }

  return {
    stepIndex,
    setStepIndex, // only for testing!
    formData,
    setStepFormData,
    errors,
    validate,
    setErrors: setUniqueErrors,
    previous,
    next,
    submitStep,
    skipStep,
    increaseStepErrors,
    currentSchema,
    isComplete,
    formRef,
    extraErrors,
    keywords: ajvKeywords,
  }
}
