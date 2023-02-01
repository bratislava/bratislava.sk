import { ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { getAllPossibleJsonSchemaProperties, getLabel, JsonSchema } from '@utils/forms'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

import SummaryStep from './SummaryStep'
import { TransformedFormData, TransformedFormStep } from './TransformedFormData'

interface SummaryProps {
  formData: Record<string, JsonSchema>
  formErrors: RJSFValidationError[][]
  extraErrors: ErrorSchema
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, extraErrors, onGoToStep }: SummaryProps) => {
  const isFieldError = (schemaPath: string, fieldName: string): boolean => {
    const errorProperty = `${schemaPath}.${fieldName}`
    return formErrors.some((errors) => {
      return errors.some((error) => error.property === errorProperty)
    })
  }

  const getAllTransformedData = (
    data: TransformedFormData[],
    schemaPath: string,
    currentExtraErrors?: ErrorSchema,
    parent?: JsonSchema,
  ) => {
    if (!parent) return
    Object.entries(parent).forEach(([key, value]: [string, JsonSchema]) => {
      const childExtraErrors = currentExtraErrors ? currentExtraErrors[key] : undefined
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const newSchemaPath = `${schemaPath}.${key}`
        getAllTransformedData(data, newSchemaPath, childExtraErrors, value)
      } else {
        const extraErrorCount = childExtraErrors?.__errors?.length ?? 0
        const field: TransformedFormData = {
          label: schema?.allOf ? getLabel(schema?.allOf, key) : key,
          value:
            (value && !Array.isArray(value)) || (Array.isArray(value) && value.length > 0)
              ? JSON.stringify(value, null, '\t').replaceAll('"', '')
              : '-',
          schemaPath,
          isError: extraErrorCount > 0 || isFieldError(schemaPath, key),
        }
        data.push(field)
      }
    })
  }

  const getAllSchemaData = (
    data: TransformedFormData[],
    schemaContent: JsonSchema,
    schemaPath: string,
    currentFormData?: any,
    currentExtraErrors?: ErrorSchema,
  ) => {
    const properties = getAllPossibleJsonSchemaProperties(schemaContent)

    Object.entries(properties).forEach(([key, value]: [string, JsonSchema]) => {
      const newSchemaPath = `${schemaPath}.${key}`
      const childExtraErrors = currentExtraErrors ? currentExtraErrors[key] : undefined
      const childFormData =
        currentFormData && typeof currentFormData !== 'boolean' ? currentFormData[key] : undefined

      if (value && typeof value !== 'boolean' && (!value.type || value.type === 'object')) {
        getAllSchemaData(data, value, newSchemaPath, childFormData, childExtraErrors)
      } else if (value && typeof value !== 'boolean') {
        const extraErrorCount = childExtraErrors?.__errors?.length ?? 0
        const field: TransformedFormData = {
          label: value.title ?? key,
          value:
            (childFormData && !Array.isArray(childFormData)) ||
            (Array.isArray(childFormData) && childFormData.length > 0)
              ? JSON.stringify(childFormData, null, '\t').replaceAll('"', '')
              : '-',
          schemaPath,
          isError: extraErrorCount > 0 || isFieldError(schemaPath, key),
        }
        data.push(field)
      }
    })
  }

  const transformStep = (step: JSONSchema7Definition): TransformedFormStep => {
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
    // getAllTransformedData(data, `.${key}`, stepExtraErrors, step)
    getAllSchemaData(data, stepContent, `.${stepKey}`, formData[stepKey], stepExtraErrors)
    return { key: stepKey, label, data }
  }

  console.log('SCHEMA', schema)
  console.log('Errors', formErrors)
  console.log('extra errors', extraErrors)
  const transformedSteps: TransformedFormStep[] = schema?.allOf
    ? schema.allOf.map(transformStep)
    : []

  return (
    <div className="my-10">
      {transformedSteps.map((step: TransformedFormStep, key: number) => {
        return step.data.length > 0 ? <SummaryStep key={key} step={step} /> : null
      })}
    </div>
  )
}

export default Summary
