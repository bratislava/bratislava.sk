// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { FormValidation } from '@rjsf/utils'
import { customizeValidator } from '@rjsf/validator-ajv8'
import { useFormStepper } from '@utils/forms'
import { client } from '@utils/gql'
import { pageStyle, parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { forceString, isProductionDeployment } from '@utils/utils'
import Button from 'components/forms/simple-components/Button'
import FinalStep from 'components/forms/steps/FinalStep'
import ObjectFieldTemplate from 'components/forms/templates/ObjectFieldTemplate'
import { ThemedForm } from 'components/forms/ThemedForm'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
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

const FormTestPage = ({
  footer,
  mainMenu,
  page,
  eform,
}: AsyncServerProps<typeof getServerSideProps>) => {
  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []
  const router = useRouter()

  let escapedSlug = ''
  const formSlug = forceString(router.query.eform)

  // Using string.match because CodeQL tools ignore regex.test as SSRF prevention.
  // eslint-disable-next-line unicorn/prefer-regexp-test
  if (formSlug.match(/^[\da-z-]+$/)) {
    escapedSlug = formSlug
  }

  const pageSlug = `form/${escapedSlug}`

  const form = useFormStepper(escapedSlug, eform.schema)
  // TODO refactor when useFormStepper will refactored
  const validateRequiredFormat = (formData: object, errors: FormValidation) => {
    const REQUIRED_VALUE = 'Required input'
    const formDataKeys = Object.keys(formData)
    formDataKeys?.forEach((key) => {
      form?.currentSchema?.properties[key]?.required?.forEach((req: string) => {
        // TODO fix ignoring errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !formData[key][req] && errors[key][req]?.addError(REQUIRED_VALUE)
      })
    })
  }
  const validateDateFromToFormat = (formData: any, errors: FormValidation) => {
    const formDataKeys = Object.keys(formData)
    formDataKeys?.forEach((key) => {
      if (
        form?.currentSchema?.properties[key]?.dateFromTo &&
        formData[key].startDate &&
        formData[key].endDate
      ) {
        const startDate = new Date(formData[key].startDate)
        const endDate = new Date(formData[key].endDate)

        if (endDate <= startDate) {
          errors[key]?.endDate?.addError('End date must be greater than start date')
        }
      }
    })
  }
  const validateTimeFromToFormat = (formData: any, errors: FormValidation) => {
    const formDataKeys = Object.keys(formData)
    formDataKeys?.forEach((key) => {
      if (
        form?.currentSchema?.properties[key]?.timeFromTo &&
        formData[key].startTime &&
        formData[key].endTime
      ) {
        const startTime: number[] = formData[key].startTime
          ?.split(':')
          .map((time: string) => parseInt(time, 10))

        const endTime: number[] = formData[key].endTime
          ?.split(':')
          .map((time: string) => parseInt(time, 10))

        const startTimeSeconds = startTime[0] * 60 * 60 + startTime[1] * 60
        const endTimeSeconds = endTime[0] * 60 * 60 + endTime[1] * 60

        if (endTimeSeconds <= startTimeSeconds) {
          errors[key]?.endTime?.addError('End time must be greater than start time')
        }
      }
    })
  }
  const customValidate = (formData: object, errors: FormValidation) => {
    validateRequiredFormat(formData, errors)
    validateDateFromToFormat(formData, errors)
    validateTimeFromToFormat(formData, errors)
    return errors
  }

  const customFormats = {
    zip: /\b\d{5}\b/,
    // https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
    time: /^(\d|0\d|1\d|2[0-3]):[0-5]\d$/,
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
            <div>
              <FinalStep state={form.state} slug={escapedSlug} />
              <Button onPress={() => form.previous()} text="Previous" />
            </div>
          ) : (
            <div>
              <ThemedForm
                key={`form-${escapedSlug}-step-${form.stepIndex}`}
                ref={form.formRef}
                schema={form.currentSchema}
                uiSchema={eform.uiSchema}
                validator={validator}
                // TODO validate it isn't a problem we forward extraneous data (from other steps) into every step
                formData={form.state}
                // currently syncing data only when we change step (and all the data in current step are valid )
                // TODO instead, hook into onChange and keep data in form state up to date with what's in ThemedForm state
                // passing data to state onChange in current state prevented the form from updating
                extraErrors={form.extraErrors}
                onSubmit={(e) => {
                  form.setState({ ...form.state, ...e.formData })
                  form.setStepIndex(form.stepIndex + 1)
                }}
                onError={(e) => console.log('errors', e)}
                customValidate={customValidate}
                showErrorList={false}
                templates={{ ObjectFieldTemplate }}
              />
              {form.stepIndex !== 0 && <Button onPress={() => form.previous()} text="Previous" />}
              <Button onPress={() => form.next()} text="Next" />
              <Button
                onPress={() => form.setStepIndex(form.stepIndex + 1)}
                text="[DEBUG] Go to next step"
              />
            </div>
          )}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
