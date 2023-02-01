import { ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { getAllPossibleJsonSchemaProperties, JsonSchema } from '@utils/forms'
import { JSONSchema7Definition } from 'json-schema'

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

  const getFieldData = (
    label: string,
    schemaPath: string,
    isError: boolean,
    fieldFormData?: JSONSchema7Definition,
  ): TransformedFormData => {
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

  const getAllSchemaData = (
    data: TransformedFormData[],
    schemaContent: JsonSchema,
    schemaPath: string,
    currentFormData?: JSONSchema7Definition,
    currentExtraErrors?: ErrorSchema,
  ) => {
    const properties = getAllPossibleJsonSchemaProperties(schemaContent)
    Object.entries(properties).forEach(([key, value]: [string, JsonSchema]) => {
      const newSchemaPath = `${schemaPath}.${key}`
      const childExtraErrors = currentExtraErrors ? currentExtraErrors[key] : undefined
      const childFormData: JSONSchema7Definition | undefined =
        currentFormData && typeof currentFormData !== 'boolean'
          ? currentFormData[key as keyof JSONSchema7Definition]
          : undefined
      if (value && typeof value !== 'boolean' && (!value.type || value.type === 'object')) {
        getAllSchemaData(data, value, newSchemaPath, childFormData, childExtraErrors)
      } else if (value && typeof value !== 'boolean') {
        const label = value.title ?? key
        const extraErrorCount: number = childExtraErrors?.__errors?.length ?? 0
        const isError: boolean = extraErrorCount > 0 || isFieldError(schemaPath, key)
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
    getAllSchemaData(data, stepContent, `.${stepKey}`, formData[stepKey], stepExtraErrors)
    return { key: stepKey, label, data }
  }

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
