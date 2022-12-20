import { JsonSchema } from '@backend/utils/forms'
import { RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'

import SummaryRow from './SummaryRow'
import TransformedFormData from './TransformedFormData'

interface SummaryProps {
  formData: Record<string, JsonSchema>
  formErrors: RJSFValidationError[]
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, onGoToStep }: SummaryProps) => {
  console.log('FORM DATA:', formData)
  console.log('FORM ERRORS:', formErrors)

  const getLabel = (schemaArray: JsonSchema[], fieldName: string): string => {
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
      } else if (item && typeof item === 'object' && !item.required && !item.properties) {
        // if item is object, includes fieldName we are finding and not includes required or properties, take value of fieldName and save title
        const fieldValue: [string, JsonSchema] | undefined = Object.entries(item).find(
          ([nestedFieldName]) => nestedFieldName === fieldName,
        )
        if (fieldValue && fieldValue[1] && typeof fieldValue[1] !== 'boolean') {
          label =
            fieldValue[1].title && fieldValue[1].type && fieldValue[1].type !== 'object'
              ? fieldValue[1].title
              : fieldName
        }
      }
      if (label !== fieldName) {
        // if label is different from fieldName, return it and end recursion
        return label
      }
    }
    return label
  }

  const getAllTransformedData = (data: TransformedFormData[], parent?: JsonSchema) => {
    if (!parent) return
    Object.entries(parent).forEach(([key, value]: [string, JsonSchema]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        getAllTransformedData(data, value)
      } else {
        const field: TransformedFormData = {
          label: schema?.allOf ? getLabel(schema?.allOf, key) : key,
          value: value ? JSON.stringify(value, null, '\t').replaceAll('"', '') : '-',
          isError: false,
        }
        data.push(field)
      }
    })
  }

  const transformedData: TransformedFormData[] = []
  getAllTransformedData(transformedData, formData)

  // Object.entries(formData).forEach(([stepName, step]) => {
  //   Object.entries(step).forEach(([fieldName, fieldData]) => {
  //     const field: TransformedFormData = {
  //       label: schema?.allOf ? getLabel(schema?.allOf, fieldName) : fieldName,
  //       value: JSON.stringify(fieldData).replaceAll('"', ''),
  //       isError: false,
  //     }
  //     transformedData.push(field)
  //   })
  // })

  return (
    <div className="my-10">
      {transformedData.map((data: TransformedFormData, key: number) => {
        return <SummaryRow key={key} data={data} />
      })}
    </div>
  )
}

export default Summary
