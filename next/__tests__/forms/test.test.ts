import { describe } from '@jest/globals';

import { EFormValue } from '../../backend/forms';
import data from '../../backend/forms/test/data.json';
import { getEform, loadAndBuildXml, validateDataWithJsonSchema, validateDataWithXsd } from '../../backend/utils/forms';

describe('form test', () => {
  let eform : EFormValue;
  beforeAll(() => {
    eform = getEform('test')
  });

  test('validate data with JSON schema', () => {
    const errors = validateDataWithJsonSchema(data, eform.schema)
    expect(errors).toHaveLength(0)
  })

  test('validate data with XSD', () => {
    const xml = loadAndBuildXml(eform.xmlTemplate, data);
    const errors = validateDataWithXsd(xml, eform.xsd)
    expect(errors).toHaveLength(0)
  })
})
