import { describe } from '@jest/globals'
import each from 'jest-each'

import eforms, { EFormKey, EFormValue } from '../backend/forms'
import {
  loadAndBuildXml,
  validateDataWithJsonSchema,
  validateDataWithXsd,
  xmlToJson,
} from '../backend/utils/forms'
import { transform } from '../backend/utils/xslt'

const excludeKeys = new Set(['test'])
describe('forms test', () => {
  each(Object.keys(eforms).filter((k: string) => !excludeKeys.has(k))).test(
    'form %s',
    async (key: EFormKey) => {
      const eform = eforms[key] as EFormValue

      const xml = loadAndBuildXml(eform.xmlTemplate, eform.data, eform.schema)

      const jsonErrors = validateDataWithJsonSchema(eform.data, eform.schema)
      expect(jsonErrors).toHaveLength(0)

      const xmlErrors = validateDataWithXsd(xml, eform.xsd)
      expect(xmlErrors).toHaveLength(0)

      const text = await transform(eform.textStylesheet, xml)
      expect(text).toBeTruthy()

      const html = await transform(eform.htmlStylesheet, xml)
      expect(html).toBeTruthy()

      const json = await xmlToJson(xml, eform.schema)
      expect(eform.data).toEqual(json)
    },
  )
})
