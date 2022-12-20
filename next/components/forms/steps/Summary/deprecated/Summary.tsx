import { JsonSchema } from '@backend/utils/forms'
import { RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'

import StepSummaryRows from './StepSummaryRows'

interface SummaryProps {
  formData: Record<string, any>
  formErrors: RJSFValidationError[]
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, onGoToStep }: SummaryProps) => {
  return (
    <div className="my-10">
      {schema?.allOf?.map((step, key) => {
        return (
          <StepSummaryRows
            key={key}
            step={step}
            formData={formData}
            formErrors={formErrors}
            onGoToStep={() => onGoToStep(key)}
          />
        )
      })}
    </div>
  )
}

export default Summary
