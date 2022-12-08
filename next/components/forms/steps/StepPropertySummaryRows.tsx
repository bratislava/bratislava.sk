import { JsonSchema, JsonSchemaProperties } from '@backend/utils/forms'

import SummaryRow from './SummaryRow'

interface StepPropertySummaryRowsProps {
  stepProperty: JsonSchema
  stepData?: JsonSchemaProperties
}

const StepPropertySummaryRows = (props: StepPropertySummaryRowsProps) => {
  const { stepProperty, stepData } = props
  const stepFields = stepProperty.properties ?? {}

  return (
    <>
      {Object.entries(stepFields).map(([fieldKey, schemaField], key) => {
        const fieldData = stepData ? stepData[fieldKey] : {}
        return (
          <SummaryRow
            key={key}
            fieldKey={fieldKey}
            schemaField={schemaField}
            fieldData={fieldData}
          />
        )
      })}
    </>
  )
}

export default StepPropertySummaryRows
