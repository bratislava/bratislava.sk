import { EFormValue } from '@backend/forms'
import { SectionContainer } from '@bratislava/ui-bratislava/SectionContainer/SectionContainer'
import { FormValidation, RJSFSchema } from '@rjsf/utils'
import { useFormStepper } from '@utils/forms'
import { useTranslation } from 'next-i18next'

import Button from '../forms/simple-components/Button'
import FinalStep from '../forms/steps/FinalStep'
import StepperView from '../forms/steps/StepperView'
import { ThemedForm } from '../forms/ThemedForm'

interface FormRJSF {
  eform: EFormValue
  escapedSlug: string
  formSlug: string
}

const FormRJSF = ({ eform, escapedSlug, formSlug }: FormRJSF) => {
  const [t] = useTranslation('forms')
  const form = useFormStepper(escapedSlug, eform.schema)

  return (
    <SectionContainer className="pt-14 md:pt-18">
      {form.isComplete ? (
        <FinalStep
          formData={form.formData}
          formErrors={form.errors}
          extraErrors={form.extraErrors}
          slug={formSlug}
          schema={eform.schema}
          onGoToStep={(step: number) => form.setStepIndex(step)}
          onGoToPreviousStep={() => form.previous()}
        />
      ) : (
        <div className="flex flex-row">
          {/* <StepperView steps={} currentStep={} /> */}
          <div>
            <ThemedForm
              key={`form-${escapedSlug}-step-${form.stepIndex}`}
              ref={form.formRef}
              schema={form.currentSchema}
              uiSchema={eform.uiSchema}
              formData={form.formData}
              validator={form.validator}
              customValidate={(formData: RJSFSchema, errors: FormValidation) => {
                return form.customValidate(formData, errors, form.currentSchema)
              }}
              onSubmit={(e) => {
                form.handleOnSubmit(e.formData)
              }}
              onChange={(e) => {
                form.setStepFormData(e.formData)
              }}
              onError={form.handleOnErrors}
              extraErrors={form.extraErrors}
              showErrorList={false}
              omitExtraData
              liveOmit
            />
            {form.stepIndex !== 0 && (
              <Button onPress={form.previous} text={t('buttons.previous')} />
            )}
            <Button onPress={form.skipStep} text={t('buttons.skip')} />
            <Button onPress={form.submitStep} text={t('buttons.continue')} />
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export default FormRJSF
