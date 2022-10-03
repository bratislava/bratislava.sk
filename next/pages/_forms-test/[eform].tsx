import { Button, PageHeader, SectionContainer } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { AsyncServerProps } from '@utils/types'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BasePageLayout from '../../components/layouts/BasePageLayout'
import PageWrapper from '../../components/layouts/PageWrapper'
import { pageStyle, parseFooter, parseMainMenu } from '../../utils/page'
import { readFile } from 'node:fs/promises'
import path from 'path'
import * as cheerio from 'cheerio'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { forceString } from '@utils/utils'
import Ajv from 'ajv'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useToggle } from 'rooks'
import { useRef } from 'react'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale ?? 'sk'

  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  // console.log(__dirname)
  // const dataPath = path.join(__dirname, '..', '..', 'forms', forceString(ctx.query.eform), 'data.xml')
  // const schemaPath = path.join(__dirname, '..', '..', 'forms', forceString(ctx.query.eform), 'schema.json')
  // console.log(dataPath)
  // const wat = await readFile(dataPath, 'utf8')

  // const $ = cheerio.load(wat, { xmlMode: true })

  // $('Ziadatel Email').empty().append('moj@email.com')
  // $('Ziadatel Email').get().fin
  // console.log($.html())

  // const ajv = new Ajv()
  // const validate = ajv.compile(schemaPath)
  // validate.schema.

  //

  // const xmlDoc = libxmljs.parseXml(wat)
  // console.log('0------------------------------------------------------')
  // console.log(xmlDoc.root().child(1).child(1).get('/').toString())
  // console.log('ww')
  // TODO continue here, looad xml doc from file

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

const MyCustomWidget = (props: any) => {
  console.log(props)
  return (
    <div>
      THIS IS A CUSTOM WIDGGET
      <input
        type="text"
        className="custom"
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  )
}

const widgets = {
  myCustomWidget: MyCustomWidget,
}

const ui = (toggle: any) => ({
  name: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:autocomplete': 'name',
  },
  address: {
    ...(toggle ? { 'ui:widget': 'hidden' } : {}),
    randomstuff: 'hello',
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
})

const schema1 = {
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

const schema2 = {
  title: 'Data',
  description: 'Example schema',
  type: 'object',
  required: ['otp'],
  properties: {
    otp: {
      type: 'string',
    },
  },
}

const FormTestPage = ({ footer, mainMenu, page }: AsyncServerProps<typeof getServerSideProps>) => {
  const menuItems = mainMenu ? parseMainMenu(mainMenu) : []

  const { t } = useTranslation('common')
  const { query } = useRouter()
  const [state, toggle] = useToggle()
  const ref = useRef()
  console.log(ref.current)
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
        >
          <SectionContainer>
            <div className="relative min-h-[220px]">
              <div className="absolute top-6">
                {/* <PageBreadcrumbs
                  parentPage={boardPage?.parentPage}
                  pageCategory={boardPage?.pageCategory}
                  title={boardPage.title}
                /> */}
              </div>
              <h1 className="whitespace-pre-wrap pt-30 text-md font-bold md:text-2xl">FORM TEST</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="pt-14 md:pt-18">
          {/* <Button onClick={() => toggle()}>Hello</Button>
          <Form
            ref={ref}
            schema={state ? schema1 : schema2}
            widgets={widgets}
            uiSchema={ui(state)}
            validator={validator}
            onChange={(e) => console.log('changed', e)}
            onSubmit={(e) => console.log('submitted', e)}
            onError={(e) => console.log('errors', e)}
          /> */}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

export default FormTestPage
