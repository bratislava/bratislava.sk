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

  console.log('SCHEMA:', schema?.$defs)

  const getAllTransformedData = (
    data: TransformedFormData[],
    schemaArray?: JsonSchema[],
    schemaKeys?: string[],
  ) => {
    if (!schemaArray) return
    for (const [index, item] of schemaArray.entries()) {
      if (Array.isArray(item)) {
        getAllTransformedData(data, item)
      } else if (typeof item === 'object' && (!item.type || item.type === 'object')) {
        const values: JsonSchema[] = Object.values(item)
        const keys: string[] = Object.keys(item)
        getAllTransformedData(data, values, keys)
      } else if (item && typeof item === 'object' && item.type && item.type !== 'object') {
        const fieldName = schemaKeys ? schemaKeys[index] ?? null : null
        if (fieldName) {
          const field: TransformedFormData = {
            label: item.title ?? fieldName,
            value: '-',
            isError: false,
          }
          data.push(field)
        }
      }
    }
  }

  const transformedData: TransformedFormData[] = []
  getAllTransformedData(transformedData, schema?.allOf)

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
