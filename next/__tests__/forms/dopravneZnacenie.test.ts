import { describe } from '@jest/globals'

import { EFormValue } from '../../backend/forms'
import data from '../../backend/forms/00603481.dopravneZnacenie.sk/data.json'
import {
  getEform,
  loadAndBuildXml,
  validateDataWithJsonSchema,
  validateDataWithXsd,
  xmlToJson,
} from '../../backend/utils/forms'
import { transform } from '../../backend/utils/xslt'

describe('form dopravne znacenie', () => {
  let eform: EFormValue
  let xml: string
  beforeAll(() => {
    eform = getEform('dopravneZnacenie')
    xml = loadAndBuildXml(eform.xmlTemplate, data, eform.schema)
  })

  test('validate data with JSON schema', async () => {
    const errors = await validateDataWithJsonSchema(data, eform.schema)
    expect(errors).toHaveLength(0)
  })

  test('validate data with XSD', () => {
    const errors = validateDataWithXsd(xml, eform.xsd)
    expect(errors).toHaveLength(0)
  })

  test('text transformation', async () => {
    const text = await transform(eform.textStylesheet, xml)
    expect(text).toBeTruthy()
  })

  test('html transformation', async () => {
    const text = await transform(eform.htmlStylesheet, xml)
    expect(text).toBeTruthy()
  })

  test('xml to json', async () => {
    const json = await xmlToJson(xml, eform.schema)
    expect(data).toEqual(json)
  })
})
