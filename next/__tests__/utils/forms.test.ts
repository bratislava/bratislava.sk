import { describe } from '@jest/globals'

import xmlTemplate from '../../backend/forms/test/xmlTemplate'
import {
  getEform,
  JsonSchema,
  loadAndBuildXml,
  validateDataWithJsonSchema,
  validateDataWithXsd,
  xmlToJson,
} from '../../backend/utils/forms'

const xsd =
  '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="comment"><xs:complexType><xs:all><xs:element name="author" type="xs:string"/><xs:element name="content" type="xs:string"/></xs:all></xs:complexType></xs:element></xs:schema>'

describe('forms utils', () => {
  test('test validate valid data with XSD schema', () => {
    const xml =
      '<?xml version="1.0"?><comment><author>author</author><content>nothing</content></comment>'

    const errors = validateDataWithXsd(xml, xsd)
    expect(errors).toHaveLength(0)
  })

  test('test validate invalid data with XSD schema', () => {
    const xml = '<?xml version="1.0"?><comment>A comment</comment>'

    const errors = validateDataWithXsd(xml, xsd)
    expect(errors).toHaveLength(2)
  })

  test('test eform', () => {
    const eform = getEform('test')
    expect(eform).toBeTruthy()
  })

  test('test not-exists eform', () => {
    const getNotExistsEform = () => {
      return getEform('')
    }

    expect(getNotExistsEform).toThrow('Invalid form name')
  })

  test('test validate data with JSON schema', async () => {
    const schema = {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
    }

    const data = {
      email: 'dev@bratislava.sk',
    }

    const errors = await validateDataWithJsonSchema(data, schema)
    expect(errors).toHaveLength(0)
  })

  test('test validate invalid data with JSON schema', async () => {
    const schema = {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
    }

    const data = {
      phone: '946846365',
    }

    const errors = await validateDataWithJsonSchema(data, schema)
    expect(errors).toHaveLength(1)
  })

  test('test async validation', async () => {
    const schema = {
      $async: true,
      type: 'object',
      required: ['user'],
      properties: {
        user: {
          type: 'object',
          properties: {
            phone: {
              type: 'string',
              isPhone: {},
            },
          },
          required: ['phone'],
        },
      },
    }

    const data = {
      user: {
        phone: '949453861',
      },
    }

    const errors = await validateDataWithJsonSchema(data, schema)
    expect(errors).toHaveLength(1)
  })

  test('json to xml, xml to json', async () => {
    const schema: JsonSchema = {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
    }

    const data = {
      phone: '946846365',
    }

    const xml = loadAndBuildXml(xmlTemplate, data, schema)
    const json = await xmlToJson(xml, schema)
    expect(data).toEqual(json)
  })
})
