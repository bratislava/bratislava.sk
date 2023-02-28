import LeftIcon from '@assets/images/chevron-left.svg'
import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import { EFormValue } from '@backend/forms'
import { FormValidation, RJSFSchema } from '@rjsf/utils'
import { useFormStepper } from '@utils/forms'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'
import FinalStep from '../../forms/steps/FinalStep'
import StepperView from '../../forms/steps/StepperView'
import { ThemedForm } from '../../forms/ThemedForm'

interface FormRJSF {
  eform: EFormValue
  escapedSlug: string
  formSlug: string
}

const GeneratedFormRJSF = ({ eform, escapedSlug, formSlug }: FormRJSF) => {
  const [t] = useTranslation('forms')
  const form = useFormStepper(escapedSlug, eform.schema)

  return (
    <div
      className={cx(
        'flex flex-col sm:gap-18 gap-10 w-full max-w-screen-lg mx-auto',
        'sm:flex-row sm:gap-20',
      )}
    >
      <div className="w-full max-w-[344px]">
        <StepperView
          steps={form.stepData}
          currentStep={form.stepIndex}
          // hook useFormStepper is prepared to skipping multiple steps but they will not be validated
          // if not wanted because of broken validation when skipping multiple steps, comment out onChangeStep
          onChangeStep={(stepIndex: number) => form.skipToStep(stepIndex)}
        />
      </div>
      <div className={cx('w-full')}>
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
          <>
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
            <div className="flex flex-row gap-5">
              <div className="grow">
                {form.stepIndex !== 0 && (
                  <Button
                    variant="plain-black"
                    onPress={form.previous}
                    text={t('buttons.previous')}
                    startIcon={<LeftIcon />}
                  />
                )}
              </div>
              <Button
                variant="black-outline"
                onPress={() => form.skipToStep(form.stepIndex + 1)}
                text={t('buttons.skip')}
              />
              <Button
                onPress={form.submitStep}
                text={t('buttons.continue')}
                endIcon={<ArrowRightIcon />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GeneratedFormRJSF
