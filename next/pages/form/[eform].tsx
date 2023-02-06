// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import FormRJSF from '@bratislava/ui-bratislava/FormRJSF/FormRJSF'
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

import StepperView from '../../components/forms/steps/StepperView'
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
  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []
  const router = useRouter()

  const formSlug = forceString(router.query.eform)
  // Using string.match because CodeQL tools ignore regex.test as SSRF prevention.
  // eslint-disable-next-line unicorn/prefer-regexp-test
  const escapedSlug = formSlug.match(/^[\da-z-]+$/) ? formSlug : ''
  const pageSlug = `form/${escapedSlug}`

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
        <FormRJSF eform={eform} escapedSlug={escapedSlug} formSlug={formSlug} />
      </BasePageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
