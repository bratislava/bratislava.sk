import { JsonSchema } from '@backend/utils/forms'
import { StrictRJSFSchema } from '@rjsf/utils'

import StepSummaryRows from './StepSummaryRows'

interface SummaryProps {
  state: Record<string, any>
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, state, onGoToStep }: SummaryProps) => {
  return (
    <div className="my-10">
      {schema?.allOf?.map((step, key) => {
        return (
          <StepSummaryRows
            key={key}
            step={step}
            stateData={state}
            onGoToStep={() => onGoToStep(key)}
          />
        )
      })}
    </div>
  )
}

export default Summary
