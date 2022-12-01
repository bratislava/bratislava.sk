import { describe } from '@jest/globals'

import {
  getEform,
  validateDataWithJsonSchema,
  validateDataWithXsd,
} from '../../backend/utils/forms'

const xsd =
  '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="comment"><xs:complexType><xs:all><xs:element name="author" type="xs:string"/><xs:element name="content" type="xs:string"/></xs:all></xs:complexType></xs:element></xs:schema>'

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

  test('test validate data with JSON schema', () => {
    const data = {
      email: 'dev@bratislava.sk',
    }

    const errors = validateDataWithJsonSchema(data, schema)
    expect(errors).toHaveLength(0)
  })

  test('test validate invalid data with JSON schema', () => {
    const data = {
      phone: '946846365',
    }

    const errors = validateDataWithJsonSchema(data, schema)
    expect(errors).toHaveLength(1)
  })
})
