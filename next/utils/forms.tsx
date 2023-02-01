import Form from '@rjsf/core'
import IChangeEvent from '@rjsf/core'
import {
  ErrorSchema,
  FormValidation,
  RJSFSchema,
  RJSFValidationError,
  StrictRJSFSchema,
} from '@rjsf/utils'
import { customizeValidator } from '@rjsf/validator-ajv8'
import { validateKeyword } from '@utils/api'
import { AnySchemaObject, FuncKeywordDefinition } from 'ajv'
import { JSONSchema7Definition } from 'json-schema'
import { forEach, get, merge } from 'lodash'
import { RefObject, useEffect, useRef, useState } from 'react'

import { ThemedForm } from '../components/forms/ThemedForm'

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

const isFieldRequired = (fieldKey: string, schema: StrictRJSFSchema): boolean => {
  return Object.entries(schema).some(([key, value]: [string, RJSFSchema]) => {
    if (key === 'required' && Array.isArray(value) && value.includes(fieldKey)) {
      return true
    }
    let isRequired = false
    if (key !== 'required' && value && Array.isArray(value)) {
      value.forEach((item) => {
        isRequired = isRequired || isFieldRequired(fieldKey, item)
      })
    } else if (key !== 'required' && value && typeof value === 'object') {
      isRequired = isRequired || isFieldRequired(fieldKey, value)
    }
    return isRequired
  })
}

const validateDateFromToFormat = (formData: RJSFSchema, errors: FormValidation, schema: any) => {
  const formDataKeys = Object.keys(formData)
  formDataKeys?.forEach((key) => {
    if (schema?.properties[key]?.dateFromTo && formData[key].startDate && formData[key].endDate) {
      const startDate = new Date(formData[key].startDate)
      const endDate = new Date(formData[key].endDate)

      if (endDate <= startDate) {
        errors[key]?.endDate?.addError('End date must be greater than start date')
      }
    }
  })
}
const validateTimeFromToFormat = (formData: RJSFSchema, errors: FormValidation, schema: any) => {
  const formDataKeys = Object.keys(formData)
  formDataKeys?.forEach((key) => {
    if (schema?.properties[key]?.timeFromTo && formData[key].startTime && formData[key].endTime) {
      const startTime: number[] = formData[key].startTime
        ?.split(':')
        .map((time: string) => parseInt(time, 10))

      const endTime: number[] = formData[key].endTime
        ?.split(':')
        .map((time: string) => parseInt(time, 10))

      const startTimeSeconds = startTime[0] * 60 * 60 + startTime[1] * 60
      const endTimeSeconds = endTime[0] * 60 * 60 + endTime[1] * 60

      if (endTimeSeconds <= startTimeSeconds) {
        errors[key]?.endTime?.addError('End time must be greater than start time')
      }
    }
  })
}

const validateRequiredFormat = (
  formData: RJSFSchema,
  errors: FormValidation,
  schema: StrictRJSFSchema,
) => {
  const REQUIRED_VALUE = 'Required input'
  Object.entries(formData).forEach(([key, value]: [string, RJSFSchema]) => {
    const currentErrors = errors[key]
    if (value && currentErrors && typeof value === 'object') {
      validateRequiredFormat(value, currentErrors, schema)
    } else if (!value && currentErrors && isFieldRequired(key, schema)) {
      currentErrors.addError(REQUIRED_VALUE)
    }
  })
}

const customValidate = (formData: RJSFSchema, errors: FormValidation, schema: StrictRJSFSchema) => {
  validateRequiredFormat(formData, errors, schema)
  validateDateFromToFormat(formData, errors, schema)
  validateTimeFromToFormat(formData, errors, schema)
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

const transformNullToUndefined = (newFormData: RJSFSchema) => {
  Object.entries(newFormData).forEach(([key, value]: [string, RJSFSchema]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      transformNullToUndefined(value)
    } else if (value === null) {
      newFormData[key] = undefined
    }
  })
}

const removeNullFields = (newFormData: RJSFSchema) => {
  const newSchema: RJSFSchema = {}
  Object.entries(newFormData).forEach(([key, value]: [string, RJSFSchema]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      newSchema[key] = removeNullFields(value)
    } else if (value && (typeof value !== 'object' || Array.isArray(value))) {
      newSchema[key] = value
    }
  })
  return newSchema
}

const customFormats = {
  zip: /\b\d{5}\b/,
  time: /^[0-2]\d:[0-5]\d$/,
}
const validator = customizeValidator({
  customFormats,
  ajvOptionsOverrides: { keywords: ajvKeywords },
})

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: RJSFSchema) => {
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
  // console.log(
  //   getAllPossibleJsonSchemaProperties(
  //     getAllPossibleJsonSchemaProperties(getAllPossibleJsonSchemaProperties(schema).checkBoxes)
  //       .favouriteFruits,
  //   ),
  // )
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

  const validate = async (): Promise<boolean> => {
    let isValid = formRef?.current?.validateForm() ?? false

    if (schema.$async === true) {
      const newExtraErrors = await validateAsyncProperties(currentSchema, formData, [])
      isValid = isValid && Object.keys(newExtraErrors).length === 0
      setExtraErrors({ ...extraErrors, ...newExtraErrors })
    }

    return isValid
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

  const increaseStepErrors = () => {
    if (stepIndex - 1 === errors.length) {
      setErrors([...errors, []])
    }
  }

  const previous = () => setStepIndex(stepIndex - 1)
  const next = () => setStepIndex(stepIndex + 1)

  const [isSkipEnabled, setIsSkipEnabled] = useState<boolean>(false)
  const disableSkip = () => setIsSkipEnabled(false)

  const submitStep = () => formRef?.current?.submit()
  const skipStep = () => setIsSkipEnabled(true)

  useEffect(() => {
    if (isSkipEnabled) {
      submitStep()
    }
  }, [isSkipEnabled])

  const setStepFormData = (stepFormData: RJSFSchema) => {
    // transformNullToUndefined(stepFormData)
    setFormData({ ...formData, ...stepFormData })
  }

  const handleOnSubmit = async (newFormData: RJSFSchema) => {
    increaseStepErrors()
    setStepFormData(newFormData)
    const isFormValid = await validate()
    if (isFormValid) {
      setUniqueErrors([], stepIndex)
    }
    if (isFormValid || isSkipEnabled) {
      next()
      disableSkip()
    }
  }

  const handleOnErrors = (newErrors: RJSFValidationError[]) => {
    setUniqueErrors(newErrors, stepIndex)
    if (isSkipEnabled) {
      next()
      disableSkip()
    }
  }

  return {
    stepIndex,
    setStepIndex, // only for testing!
    formData,
    setStepFormData,
    errors,
    extraErrors,
    validate,
    setErrors: setUniqueErrors,
    previous,
    next,
    submitStep,
    skipStep,
    isSkipEnabled,
    disableSkip,
    increaseStepErrors,
    customValidate,
    handleOnSubmit,
    handleOnErrors,
    currentSchema,
    isComplete,
    formRef,
    keywords: ajvKeywords,
    customFormats,
    validator,
  }
}
