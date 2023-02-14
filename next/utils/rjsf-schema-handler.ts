import { ErrorSchema, RJSFValidationError } from '@rjsf/utils'
import { getAllPossibleJsonSchemaProperties, JsonSchema } from '@utils/forms'
import { JSONSchema7Definition } from 'json-schema'

import { TransformedFormData } from '../components/forms/steps/Summary/TransformedFormData'

export function getFieldData(
  label: string,
  schemaPath: string,
  isError: boolean,
  fieldFormData?: JSONSchema7Definition,
): TransformedFormData {
  return {
    label,
    value:
      (fieldFormData && !Array.isArray(fieldFormData)) ||
      (Array.isArray(fieldFormData) && fieldFormData.length > 0)
        ? JSON.stringify(fieldFormData, null, '\t').replaceAll('"', '')
        : '-',
    schemaPath,
    isError,
  }
}

export function isFieldError(
  formErrors: RJSFValidationError[][],
  schemaPath: string,
  fieldName: string,
): boolean {
  const errorProperty = `${schemaPath}.${fieldName}`
  return formErrors.some((errors) => {
    return errors.some((error) => error.property === errorProperty)
  })
}

export function getAllSchemaData(
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
      )
      data.push(fieldData)
    }
  })
}
