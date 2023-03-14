// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { PageHeader } from '@bratislava/ui-bratislava'
import GeneratedFormRJSF from '@bratislava/ui-bratislava/FormRJSF/GeneratedFormRJSF'
import { pageStyle } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { forceString, isProductionDeployment } from '@utils/utils'
import FormPageLayout from 'components/layouts/FormPageLayout'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

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

  return {
    props: {
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
      ...(await serverSideTranslations(locale)),
    },
  }
}

// it looks like we will not need this, but we can keep it for now
// const initDefaultSchemaFields = (schema: StrictRJSFSchema) => {
//   if (!schema || typeof schema !== 'object') return
//   if (schema.type && schema.type !== 'object' && !schema.default) {
//     Object.assign(schema, { default: null })
//   }
//   Object.values(schema).forEach((value) => {
//     if (Array.isArray(value)) {
//       value.forEach((item) => initDefaultSchemaFields(item))
//     } else {
//       initDefaultSchemaFields(value)
//     }
//   })
// }

const FormTestPage = ({ page, eform }: AsyncServerProps<typeof getServerSideProps>) => {
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
      <FormPageLayout navHidden>
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
        <GeneratedFormRJSF eform={eform} escapedSlug={escapedSlug} formSlug={formSlug} />
      </FormPageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
