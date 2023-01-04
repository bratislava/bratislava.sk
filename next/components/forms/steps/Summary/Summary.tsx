import { RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { getLabel, JsonSchema } from '@utils/forms'
import { JSONSchema7Definition } from 'json-schema'

import SummaryStep from './SummaryStep'
import { TransformedFormData, TransformedFormStep } from './TransformedFormData'

interface SummaryProps {
  formData: Record<string, JsonSchema>
  formErrors: RJSFValidationError[][]
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, onGoToStep }: SummaryProps) => {
  const isFieldError = (schemaPath: string, fieldName: string): boolean => {
    const errorProperty = `${schemaPath}.${fieldName}`
    return formErrors.some((errors) => {
      return errors.some((error) => error.property === errorProperty)
    })
  }

  // const getRequiredEmptyData = (data: TransformedFormData[], schemaPath: string) => {
  //   console.log('SCHEMA PATH:', schemaPath)
  //   formErrors.forEach((stepErrors) => {
  //     stepErrors.forEach((error) => {
  //       if (error.name === 'required' && error.property === schemaPath) {
  //         const field: TransformedFormData = {
  //           label: schema?.allOf
  //             ? getLabel(schema?.allOf, error.params.missingProperty)
  //             : error.params.missingProperty,
  //           value: '-',
  //           schemaPath,
  //           isError: true,
  //         }
  //         data.push(field)
  //       }
  //     })
  //   })
  // }

  const getAllTransformedData = (
    data: TransformedFormData[],
    schemaPath: string,
    parent?: JsonSchema,
  ) => {
    if (!parent) return
    Object.entries(parent).forEach(([key, value]: [string, JsonSchema]) => {
      console.log(key, ':', value)
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const newSchemaPath = `${schemaPath}.${key}`
        getAllTransformedData(data, newSchemaPath, value)
      } else {
        const field: TransformedFormData = {
          label: schema?.allOf ? getLabel(schema?.allOf, key) : key,
          value:
            (value && !Array.isArray(value)) || (Array.isArray(value) && value.length > 0)
              ? JSON.stringify(value, null, '\t').replaceAll('"', '')
              : '-',
          schemaPath,
          isError: isFieldError(schemaPath, key),
        }
        data.push(field)
      }
    })
  }

  const transformStep = ([key, step]: [string, JSONSchema7Definition]): TransformedFormStep => {
    const label = schema?.allOf ? getLabel(schema.allOf, key) : key
    const data: TransformedFormData[] = []
    getAllTransformedData(data, `.${key}`, step)
    return { key, label, data }
  }

  const transformedSteps: TransformedFormStep[] = Object.entries(formData).map(transformStep)

  return (
    <div className="my-10">
      {transformedSteps.map((step: TransformedFormStep, key: number) => {
        return step.data.length > 0 ? <SummaryStep key={key} step={step} /> : null
      })}
    </div>
  )
}

export default Summary
