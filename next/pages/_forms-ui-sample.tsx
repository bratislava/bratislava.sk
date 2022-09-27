// if you want to see 'nice' default components, uncomment this import
// be aware it may break styling of the rest of the app, including custom components!
// import 'bootstrap/dist/css/bootstrap.min.css'

import { PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import validator from '@rjsf/validator-ajv8'
import { client } from '@utils/gql'
import { AsyncServerProps } from '@utils/types'
import { ThemedForm } from 'components/forms/ThemedForm'
import { JSONSchema7Type } from 'json-schema'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle, parseFooter, parseMainMenu } from '../utils/page'
import { isProductionDeployment } from '../utils/utils'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  return {
    props: {
      footer,
      mainMenu,
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

const uiSchema = {
  name: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'name',
  },

  birthDate: {
    'ui:widget': 'alt-datetime',
  },
  email: {
    'ui:widget': 'myCustomWidget',
    randomstuff: 'hello',
  },
  phone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
}

const schema: JSONSchema7Type = {
  title: 'Data',
  description: 'Example schema',
  type: 'object',
  required: ['address', 'name', 'birthDate', 'postalCode', 'city', 'email', 'phone'],
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    birthDate: {
      type: 'string',
    },
    newTaxpayer: {
      type: 'boolean',
    },
    address: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
  },
}

const FormTestPage = ({ footer, mainMenu, page }: AsyncServerProps<typeof getServerSideProps>) => {
  const menuItems = parseMainMenu(mainMenu)
  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'mesto-bratislava/transparentne-mesto/uradna-tabula' },
        { locale: 'en', slug: 'city-of-bratislava/transparent-city/official-noticeboard' },
      ]}
    >
      <BasePageLayout footer={(footer && parseFooter(footer)) ?? undefined} menuItems={menuItems}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle('red'),
          }}
        />
        <PageHeader
          imageSrc=""
          color="var(--secondary-color)"
          transparentColor="var(--secondary-color--transparent)"
          transparentColorMobile="var(--secondary-color--semi-transparent)"
          className="header-main-bg bg-cover"
        />
        <SectionContainer className="pt-14 md:pt-18">
          <ThemedForm
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onChange={(e) => console.log('changed', e)}
            onSubmit={(e) => console.log('submitted', e)}
            onError={(e) => console.log('errors', e)}
          />
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
