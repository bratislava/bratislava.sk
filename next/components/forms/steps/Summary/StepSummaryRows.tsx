import { JsonSchema } from '@backend/utils/forms'
import { boolean } from 'property-information/lib/util/types'
import React from 'react'

import StepPropertySummaryRows from './StepPropertySummaryRows'

interface StepSummaryRowsProps {
  step: JsonSchema
  stateData: Record<string, any>
  onGoToStep?: () => void
}

const StepSummaryRows = (props: StepSummaryRowsProps) => {
  const { step, stateData, onGoToStep } = props
  // every step can have multiple properties which include fields
  const stepProperties = typeof step !== 'boolean' ? step.properties ?? {} : {}

  return (
    <>
      {Object.entries(stepProperties).map(([stepPropertyKey, stepProperty], key) => (
        <StepPropertySummaryRows
          key={key}
          stepProperty={stepProperty}
          stepData={stateData[stepPropertyKey]}
          onGoToStep={onGoToStep}
        />
      ))}
    </>
  )
}

export default StepSummaryRows
