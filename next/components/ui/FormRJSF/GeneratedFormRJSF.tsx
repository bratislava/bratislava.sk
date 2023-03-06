import LeftIcon from '@assets/images/chevron-left.svg'
import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import { EFormValue } from '@backend/forms'
import { FormValidation, RJSFSchema } from '@rjsf/utils'
import { useFormStepper, useFormSubmitter } from '@utils/forms'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'
import FinalStep from '../../forms/steps/FinalStep'
import StepperView from '../../forms/steps/StepperView'
import StepButtonGroup from '../../forms/steps/Summary/StepButtonGroup'
import { ThemedForm } from '../../forms/ThemedForm'

interface FormRJSF {
  eform: EFormValue
  escapedSlug: string
  formSlug: string
}

const GeneratedFormRJSF = ({ eform, escapedSlug, formSlug }: FormRJSF) => {
  const [t] = useTranslation('forms')
  const form = useFormStepper(escapedSlug, eform.schema)
  const submitter = useFormSubmitter(formSlug)

  return (
    <div className={cx('flex flex-col  sm:gap-20 gap-10 w-full', 'sm:flex-row sm:gap-20')}>
      <div className="">
        <StepperView
          steps={form.stepData}
          currentStep={form.stepIndex}
          // hook useFormStepper is prepared to skipping multiple steps but they will not be validated
          // if not wanted because of broken validation when skipping multiple steps, comment out onChangeStep
          onChangeStep={(stepIndex: number) => form.skipToStep(stepIndex)}
        />
      </div>
      <div className={cx('grow mx-8', 'lg:mx-28')}>
        {form.isComplete ? (
          <FinalStep
            formData={form.formData}
            formErrors={form.errors}
            extraErrors={form.extraErrors}
            schema={eform.schema}
            onGoToStep={(step: number) => form.setStepIndex(step)}
            submitErrors={submitter.errors}
            submitMessage={submitter.successMessage}
          />
        ) : (
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
        )}
        <StepButtonGroup
          stepIndex={form.stepIndex}
          isFinalStep={form.isComplete}
          previous={form.previous}
          skip={() => form.skipToStep(form.stepIndex + 1)}
          submitStep={form.submitStep}
          submitForm={() => submitter.submitForm(form.formData)}
        />
      </div>
    </div>
  )
}

export default GeneratedFormRJSF
