import { ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { JsonSchema } from '@utils/forms'
import { useFormDataTransform } from '@utils/rjsf-schema-handler'

import SummaryStep from './SummaryStep'
import { TransformedFormStep } from './TransformedFormData'

interface SummaryProps {
  formData: Record<string, JsonSchema>
  formErrors: RJSFValidationError[][]
  extraErrors: ErrorSchema
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, extraErrors, onGoToStep }: SummaryProps) => {
  const { transformedSteps } = useFormDataTransform(formData, formErrors, extraErrors, schema)

  return (
    <div className="my-10">
      {transformedSteps.map((step: TransformedFormStep, key: number) => {
        return step.data.length > 0 ? (
          <SummaryStep key={key} step={step} onGoToStep={() => onGoToStep(key)} />
        ) : null
      })}
    </div>
  )
}

export default Summary
