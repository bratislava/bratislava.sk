// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { FormValidation, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils'
import { customizeValidator } from '@rjsf/validator-ajv8'
import { useFormStepper } from '@utils/forms'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { forceString, isProductionDeployment } from '@utils/utils'
import Button from 'components/forms/simple-components/Button'
import FinalStep from 'components/forms/steps/FinalStep'
import { ThemedForm } from 'components/forms/ThemedForm'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BasePageLayout from '../../components/layouts/BasePageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  let eform: EFormValue
  try {
    eform = getEform(ctx.query.eform)
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }

  // necessary for page wrappers common for entire web
  const locale = ctx.locale ?? 'sk'
  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  return {
    props: {
      footer,
      mainMenu,
      eform,
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      ...(await serverSideTranslations(locale, ['common', 'footer', 'forms'])),
    },
  }
}

const initDefaultSchemaFields = (schema: StrictRJSFSchema) => {
  if (!schema || typeof schema !== 'object') return
  if (schema.type && schema.type !== 'object' && !schema.default) {
    Object.assign(schema, { default: null })
  }
  Object.values(schema).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => initDefaultSchemaFields(item))
    } else {
      initDefaultSchemaFields(value)
    }
  })
}

const FormTestPage = ({
  footer,
  mainMenu,
  page,
  eform,
}: AsyncServerProps<typeof getServerSideProps>) => {
  const [t] = useTranslation('forms')
  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []
  const router = useRouter()

  const formSlug = forceString(router.query.eform)
  // Using string.match because CodeQL tools ignore regex.test as SSRF prevention.
  // eslint-disable-next-line unicorn/prefer-regexp-test
  const escapedSlug = formSlug.match(/^[\da-z-]+$/) ? formSlug : ''
  const pageSlug = `form/${escapedSlug}`

  initDefaultSchemaFields(eform.schema)
  const form = useFormStepper(escapedSlug, eform.schema)

  const customFormats = {
    zip: /\b\d{5}\b/,
    time: /^[0-2]\d:[0-5]\d$/,
  }
  const validator = customizeValidator({
    customFormats,
    ajvOptionsOverrides: { keywords: form.keywords },
  })

  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: pageSlug },
        { locale: 'en', slug: pageSlug },
      ]}
    >
      <BasePageLayout footer={(footer && parseFooter(footer)) ?? undefined} menuItems={menuItems}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle('main'),
          }}
        />
        {/* TODO replace with form header */}
        <PageHeader
          imageSrc=""
          color="var(--category-color-200)"
          transparentColor="var(--category-color-200--transparent)"
          transparentColorMobile="var(--category-color-200--semi-transparent)"
          className="header-main-bg bg-cover"
        >
          TODO form info
        </PageHeader>
        <SectionContainer className="pt-14 md:pt-18">
          {/* A prototype stepper, when useForm hook points to a valid jsonSchema it renders it using rjsf,
              otherwise displays summary with all data and submit button
            */}
          {form.isComplete ? (
            <FinalStep
              formData={form.formData}
              formErrors={form.errors}
              slug={formSlug}
              schema={eform.schema}
              onGoToStep={(step: number) => form.setStepIndex(step)}
              onGoToPreviousStep={() => form.previous()}
            />
          ) : (
            <div>
              <ThemedForm
                key={`form-${escapedSlug}-step-${form.stepIndex}`}
                ref={form.formRef}
                schema={form.currentSchema}
                uiSchema={eform.uiSchema}
                validator={validator}
                formData={form.formData}
                onSubmit={(e) => {
                  form.increaseStepErrors()
                  form.setStepFormData(e.formData)
                  const isFormValid = form.validate()
                  if (isFormValid) {
                    form.setErrors([], form.stepIndex)
                  }
                  if (isFormValid || form.isSkipEnabled) {
                    form.next()
                    form.disableSkip()
                  }
                }}
                onChange={(e) => {
                  form.setStepFormData(e.formData)
                }}
                onError={(errors) => {
                  form.setErrors(errors, form.stepIndex)
                  if (form.isSkipEnabled) {
                    form.next()
                    form.disableSkip()
                  }
                }}
                customValidate={(formData: RJSFSchema, errors: FormValidation) => {
                  return form.customValidate(formData, errors, form.currentSchema)
                }}
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
          )}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
