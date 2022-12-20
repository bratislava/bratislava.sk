import { JsonSchema } from '@backend/utils/forms'
import { RJSFValidationError } from '@rjsf/utils'
import { boolean } from 'property-information/lib/util/types'
import React from 'react'

import StepPropertySummaryRows from './StepPropertySummaryRows'

interface StepSummaryRowsProps {
  step: JsonSchema
  formData: Record<string, any>
  formErrors: RJSFValidationError[]
  onGoToStep?: () => void
}

const StepSummaryRows = (props: StepSummaryRowsProps) => {
  const { step, formData, formErrors, onGoToStep } = props
  // every step can have multiple properties which include fields
  const stepProperties = typeof step !== 'boolean' ? step.properties ?? {} : {}

  return (
    <>
      {Object.entries(stepProperties).map(([stepPropertyKey, stepProperty], key) => (
        <StepPropertySummaryRows
          key={key}
          stepProperty={stepProperty}
          stepData={formData[stepPropertyKey]}
          formErrors={formErrors}
          onGoToStep={onGoToStep}
        />
      ))}
    </>
  )
}

export default StepSummaryRows
