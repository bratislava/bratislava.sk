import { JsonSchema } from '@backend/utils/forms'

import StepSummaryRows from './StepSummaryRows'

interface SummaryProps {
  state: Record<string, any>
  schema?: JsonSchema[]
}

const Summary = ({ schema, state }: SummaryProps) => {
  return (
    <div className="my-10">
      {schema?.map((step, key) => {
        return <StepSummaryRows key={key} step={step} stateData={state} />
      })}
    </div>
  )
}

export default Summary
