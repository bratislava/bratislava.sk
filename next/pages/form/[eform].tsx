// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { EFormValue } from '@backend/forms'
import { PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { customizeValidator } from '@rjsf/validator-ajv8'
import { useFormStepper } from '@utils/forms'
import { client } from '@utils/gql'
import { AsyncServerProps } from '@utils/types'
import { forceString } from '@utils/utils'
import Button from 'components/forms/simple-components/Button'
import FinalStep from 'components/forms/steps/FinalStep'
import { ThemedForm } from 'components/forms/ThemedForm'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { getEform } from '../../backend/utils/forms'
import BasePageLayout from '../../components/layouts/BasePageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import { pageStyle, parseFooter, parseMainMenu } from '../../utils/page'
import { isProductionDeployment } from '../../utils/utils'

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
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
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
  // eslint-disable-next-line unicorn/prefer-regexp-test
  if (formSlug.match(/^[\da-z-]+$/)) {
    escapedSlug = formSlug
  }

  const pageSlug = `form/${escapedSlug}`

  const form = useFormStepper(escapedSlug, eform.schema)
  const customFormats = {
    zip: /\b\d{5}\b/,
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
