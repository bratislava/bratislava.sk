import { ErrorSchema, RJSFValidationError, StrictRJSFSchema } from '@rjsf/utils'
import { getAllPossibleJsonSchemaProperties, JsonSchema } from '@utils/forms'
import { getAllSchemaData } from '@utils/rjsf-schema-handler'
import { JSONSchema7Definition } from 'json-schema'

import SummaryStep from './SummaryStep'
import { TransformedFormData, TransformedFormStep } from './TransformedFormData'

interface SummaryProps {
  formData: Record<string, JsonSchema>
  formErrors: RJSFValidationError[][]
  extraErrors: ErrorSchema
  schema?: StrictRJSFSchema
  onGoToStep: (step: number) => void
}

const Summary = ({ schema, formData, formErrors, extraErrors, onGoToStep }: SummaryProps) => {
  const transformStep = (step: JSONSchema7Definition): TransformedFormStep => {
    if (typeof step === 'boolean' || !step?.properties) return { key: '', label: '', data: [] }
    const stepContent: JSONSchema7Definition = Object.values(step.properties)[0]
    const stepKey: string = Object.keys(step.properties)[0]
    const label: string =
      typeof stepContent !== 'boolean' && stepContent.title
        ? stepContent.title
        : typeof step !== 'boolean' && step.properties
        ? Object.keys(step.properties)[0]
        : ''
    const data: TransformedFormData[] = []
    const stepExtraErrors = extraErrors[stepKey]
    getAllSchemaData(
      data,
      stepContent,
      `.${stepKey}`,
      formErrors,
      formData[stepKey],
      stepExtraErrors,
    )
    return { key: stepKey, label, data }
  }

  const transformedSteps: TransformedFormStep[] = schema?.allOf
    ? schema.allOf.map(transformStep)
    : []

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
