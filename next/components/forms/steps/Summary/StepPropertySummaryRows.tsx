import { JsonSchema, JsonSchemaProperties } from '@backend/utils/forms'
import { RJSFValidationError } from '@rjsf/utils'

import SummaryRow from './SummaryRow'

interface StepPropertySummaryRowsProps {
  stepProperty: JsonSchema
  stepData?: JsonSchemaProperties
  formErrors: RJSFValidationError[]
  onGoToStep?: () => void
}

const StepPropertySummaryRows = (props: StepPropertySummaryRowsProps) => {
  const { stepProperty, stepData, formErrors, onGoToStep } = props
  const stepFields = typeof stepProperty !== 'boolean' ? stepProperty.properties ?? {} : {}

  const getIsError = (fieldKey: string): boolean => {
    console.log('SUMMARY ERRORS:', formErrors)
    return formErrors.some((error) => {
      return Object.values(error.params).includes(fieldKey)
    })
  }

  return (
    <>
      {Object.entries(stepFields).map(([fieldKey, schemaField], key) => {
        const fieldData = stepData ? stepData[fieldKey] : {}
        const isError = getIsError(fieldKey)
        return (
          <SummaryRow
            key={key}
            fieldKey={fieldKey}
            schemaField={schemaField}
            fieldData={fieldData}
            isError={isError}
            onGoToStep={onGoToStep}
          />
        )
      })}
    </>
  )
}

export default StepPropertySummaryRows
