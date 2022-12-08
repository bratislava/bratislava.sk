import { JsonSchema } from '@backend/utils/forms'
import React from 'react'

import StepPropertySummaryRows from './StepPropertySummaryRows'
import SummaryRow from './SummaryRow'

interface StepSummaryRowsProps {
  step: JsonSchema
  stateData: Record<string, any>
}

const StepSummaryRows = (props: StepSummaryRowsProps) => {
  const { step, stateData } = props
  const stepProperties = step.properties ?? {}
  return (
    <>
      {Object.entries(stepProperties).map(([stepPropertyKey, stepProperty], key) => (
        <StepPropertySummaryRows
          key={key}
          stepProperty={stepProperty}
          stepData={stateData[stepPropertyKey]}
        />
      ))}
    </>
  )
}

export default StepSummaryRows
