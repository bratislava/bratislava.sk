import Form from '@rjsf/core'
import {
  ErrorSchema,
  FormValidation,
  RJSFSchema,
  RJSFValidationError,
  StrictRJSFSchema,
} from '@rjsf/utils'
import { customizeValidator } from '@rjsf/validator-ajv8'
import { ApiError, submitEform, validateKeyword } from '@utils/api'
import { AnySchemaObject, ErrorObject, FuncKeywordDefinition } from 'ajv'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { get, merge } from 'lodash'
import { useTranslation } from 'next-i18next'
import { RefObject, useEffect, useRef, useState } from 'react'

import { StepData } from '../components/forms/types/TransformedFormData'

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
    if (
      schema?.properties &&
      schema?.properties[key]?.dateFromTo &&
      formData[key].startDate &&
      formData[key].endDate
    ) {
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
    if (
      schema?.properties &&
      schema?.properties[key]?.timeFromTo &&
      formData[key].startTime &&
      formData[key].endTime
    ) {
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

const customFormats = {
  zip: /\b\d{5}\b/,
  time: /^[0-2]\d:[0-5]\d$/,
}
const validator = customizeValidator({
  customFormats,
  ajvOptionsOverrides: { keywords: ajvKeywords },
})

const getStepData = (schema: RJSFSchema): StepData[] => {
  if (!schema || !schema.allOf) return []
  return schema.allOf
    .map((step) => {
      if (typeof step === 'boolean') return null
      const transformedStep: JSONSchema7 = step
      if (!transformedStep.properties || Object.values(transformedStep.properties).length === 0)
        return null
      const stepProperties = transformedStep.properties ?? {}
      const [key, value]: [string, JSONSchema7Definition] = Object.entries(stepProperties)[0]
      if (typeof value === 'boolean') return null
      return {
        title: value.title ?? key,
        stepKey: key,
        isFilled: false,
      }
    })
    .filter(Boolean) as StepData[]
}

// TODO prevent unmounting
// TODO persist state for session
// TODO figure out if we need to step over uiSchemas, or having a single one is enough (seems like it is for now)
export const useFormStepper = (eformSlug: string, schema: RJSFSchema) => {
  // since Form can be undefined, useRef<Form> is understood as an overload of useRef returning MutableRef, which does not match expected Ref type be rjsf
  // also, our code expects directly RefObject otherwise it will complain of no `.current`
  // this is probably a bug in their typing therefore the cast
  const formRef = useRef<Form>() as RefObject<Form>

  const [nextStepIndex, setNextStepIndex] = useState<number | null>(null)
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [formData, setFormData] = useState<RJSFSchema>({})
  const [errors, setErrors] = useState<RJSFValidationError[][]>([])
  const [extraErrors, setExtraErrors] = useState<ErrorSchema>({})
  const [stepData, setStepData] = useState<StepData[]>(getStepData(schema))

  const steps = schema?.allOf
  const stepsLength: number = steps?.length ?? -1
  const isComplete = stepIndex === stepsLength

  const currentSchema = steps ? (steps[stepIndex] as RJSFSchema) : {}

  useEffect(() => {
    // effect to reset all internal state when critical input 'props' change
    setFormData({})
    setStepIndex(0)
    setStepData(getStepData(schema))
  }, [eformSlug, schema])

  useEffect(() => {
    // stepIndex allowed to climb one step above the length of steps - i.e. to render a final overview or other custom components but still allow to return back
    if (stepIndex > stepsLength) {
      // stepIndex larger than last step index + 1
      setStepIndex(stepsLength)
    }
  }, [stepIndex, steps, stepsLength])

  useEffect(() => window.scrollTo(0, 0), [stepIndex])

  const changeStepData = (targetIndex: number, value: boolean): void => {
    const newStepData: StepData[] = stepData.map((step: StepData, index: number) =>
      index === targetIndex ? { ...step, isFilled: value } : { ...step },
    )
    setStepData(newStepData)
  }

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
  const jumpToStep = () => {
    if (nextStepIndex) {
      setStepIndex(nextStepIndex)
      setNextStepIndex(null)
    }
  }

  const [isSkipEnabled, setIsSkipEnabled] = useState<boolean>(false)
  const disableSkip = () => setIsSkipEnabled(false)

  const submitStep = () => {
    formRef?.current?.submit()
  }

  // need to handle skipping with submitting and validating (skip step means do submitting and validating but always go to next step)
  useEffect(() => {
    console.log('is skip enabled:', isSkipEnabled)
    if (isSkipEnabled) {
      if (isComplete) {
        jumpToStep()
        disableSkip()
      } else {
        submitStep()
      }
    }
  }, [isSkipEnabled])

  // this is needed for skipping multiple steps through StepperView
  // TODO: could be reduced by wrapping nextStepIndex and isSkipEnabled to 1 object
  useEffect(() => {
    if (nextStepIndex) {
      setIsSkipEnabled(true)
    }
  }, [nextStepIndex])

  const skipToStep = (newNextStepIndex: number) => {
    setNextStepIndex(newNextStepIndex)
  }

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
    if (isFormValid && !isSkipEnabled) {
      changeStepData(stepIndex, true)
      next()
      disableSkip()
    }
    if (!isFormValid || (isFormValid && isSkipEnabled)) {
      jumpToStep()
      disableSkip()
    }
  }

  const handleOnErrors = (newErrors: RJSFValidationError[]) => {
    setUniqueErrors(newErrors, stepIndex)
    if (isSkipEnabled) {
      changeStepData(stepIndex, false)
      jumpToStep()
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
    stepData,
    previous,
    next,
    submitStep,
    skipToStep,
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

export const useFormSubmitter = (slug: string) => {
  const [errors, setErrors] = useState<Array<ErrorObject | string>>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { t } = useTranslation('forms')

  const submitForm = async (formData: RJSFSchema) => {
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

  return {
    submitForm,
    errors,
    successMessage,
  }
}
