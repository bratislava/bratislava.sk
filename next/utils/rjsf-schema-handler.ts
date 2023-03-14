import { EnumOptionsType, ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { getAllPossibleJsonSchemaProperties, JsonSchema } from '@utils/forms'
import { JSONSchema7Definition } from 'json-schema'

import {
  TransformedFormData,
  TransformedFormStep,
} from '../components/forms/steps/Summary/TransformedFormData'

function findTitle(value: JSONSchema7Definition, items: JSONSchema7Definition[]) {
  if (typeof items === 'boolean') return value
  const enumOption = items.find(
    (item: JSONSchema7Definition) => typeof item !== 'boolean' && item.const === value,
  )
  return enumOption && typeof enumOption !== 'boolean' && enumOption.title
    ? enumOption.title
    : value
}

// transform value from formData which is array to simple text for Summary
// array values (select, checkboxes etc) are arrays with value of enum (property .const)
// we need original title of enum to show in Summary, so we must map it
function transformValueArray(
  fieldFormData?: JSONSchema7Definition,
  fieldSchema?: JSONSchema7Definition,
) {
  if (!fieldFormData || typeof fieldFormData === 'boolean') return
  if (!fieldSchema || typeof fieldSchema === 'boolean') return fieldFormData

  const items =
    fieldSchema.type === 'array' &&
    fieldSchema.items &&
    typeof fieldSchema.items === 'object' &&
    !Array.isArray(fieldSchema.items)
      ? fieldSchema.items.anyOf ?? fieldSchema.items.oneOf ?? fieldSchema.items.allOf
      : fieldSchema.oneOf

  if (!items || typeof items === 'boolean' || !Array.isArray(items)) return fieldFormData

  return Array.isArray(fieldFormData)
    ? fieldFormData.map((value) => findTitle(value, items))
    : findTitle(fieldFormData, items)
}

function getFieldData(
  label: string,
  schemaPath: string,
  isError: boolean,
  fieldFormData?: JSONSchema7Definition,
  fieldSchema?: JSONSchema7Definition,
): TransformedFormData {
  const transformedFieldFormData = transformValueArray(fieldFormData, fieldSchema)
  const value =
    transformedFieldFormData && !Array.isArray(transformedFieldFormData)
      ? transformedFieldFormData.toString()
      : Array.isArray(transformedFieldFormData) && transformedFieldFormData.length > 0
      ? transformedFieldFormData.join(', ')
      : '-'

  return {
    label,
    value,
    schemaPath,
    isError,
  }
}

function isFieldError(
  formErrors: RJSFValidationError[][],
  schemaPath: string,
  fieldName: string,
): boolean {
  const errorProperty = `${schemaPath}.${fieldName}`
  return formErrors.some((errors) => {
    return errors.some((error) => error.property === errorProperty)
  })
}

function getAllSchemaData(
  data: TransformedFormData[],
  schemaContent: JsonSchema,
  schemaPath: string,
  formErrors: RJSFValidationError[][],
  currentFormData?: JSONSchema7Definition,
  currentExtraErrors?: ErrorSchema,
): void {
  const properties = getAllPossibleJsonSchemaProperties(schemaContent)
  Object.entries(properties).forEach(([key, value]: [string, JsonSchema]) => {
    const newSchemaPath = `${schemaPath}.${key}`
    const childExtraErrors = currentExtraErrors ? currentExtraErrors[key] : undefined
    const childFormData: JSONSchema7Definition | undefined =
      currentFormData && typeof currentFormData !== 'boolean'
        ? currentFormData[key as keyof JSONSchema7Definition]
        : undefined
    if (value && typeof value !== 'boolean' && (!value.type || value.type === 'object')) {
      getAllSchemaData(data, value, newSchemaPath, formErrors, childFormData, childExtraErrors)
    } else if (value && typeof value !== 'boolean') {
      const label = value.title ?? key
      const extraErrorCount: number = childExtraErrors?.__errors?.length ?? 0
      const isError: boolean = extraErrorCount > 0 || isFieldError(formErrors, schemaPath, key)
      const fieldData: TransformedFormData = getFieldData(
        label,
        newSchemaPath,
        isError,
        childFormData,
        value,
      )
      data.push(fieldData)
    }
  })
}

function transformStep(
  step: JSONSchema7Definition,
  formData: Record<string, JsonSchema>,
  formErrors: RJSFValidationError[][],
  extraErrors: ErrorSchema,
): TransformedFormStep {
  if (typeof step === 'boolean' || !step?.properties) return { key: '', label: '', data: [] }
  const stepContent: JSONSchema7Definition = Object.values(step.properties)[0]
  const stepKey: string = Object.keys(step.properties)[0]
  const label: string =
    typeof stepContent !== 'boolean' && stepContent.title
      ? stepContent.title
      : typeof step !== 'boolean' && step.properties
      ? Object.keys(step.properties)[0]
      : ''
  const data: TransformedFormData[] = []
  const stepExtraErrors = extraErrors[stepKey]
  getAllSchemaData(data, stepContent, `.${stepKey}`, formErrors, formData[stepKey], stepExtraErrors)
  return { key: stepKey, label, data }
}

export const useFormDataTransform = (
  formData: Record<string, JsonSchema>,
  formErrors: RJSFValidationError[][],
  extraErrors: ErrorSchema,
  schema?: StrictRJSFSchema,
) => {
  const transformedSteps: TransformedFormStep[] = schema?.allOf
    ? schema.allOf.map((step) => transformStep(step, formData, formErrors, extraErrors))
    : []

  return {
    transformedSteps,
  }
}
