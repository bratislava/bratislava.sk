import { describe } from '@jest/globals'

import testXsd from '../../backend/forms/test/schema.xsd'
import { validateDataWithXsd } from '../../backend/utils/forms'

// eslint-disable-next-line no-secrets/no-secrets
const testXml = `<?xml version="1.0" encoding="utf-8"?>
<E-form xmlns="http://schemas.gov.sk/doc/eform/form/0.1" xsi:schemaLocation="http://schemas.gov.sk/doc/eform/form/0.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Meta>
        <ID>00603481.dopravneZnacenie.sk</ID>
        <Name>Dopravné značenie</Name>
        <Gestor/>
        <RecipientId/>
        <Version>0.2</Version>
        <ZepRequired>false</ZepRequired>
        <EformUuid>5ea0cad2-8759-4826-8d4c-c59c1d09ec29</EformUuid>
        <SenderID>mailto:hruska@example.com</SenderID>
    </Meta>
    <Body>
        <Ziadatel>
            <FirstName>firstName</FirstName>
            <Address>id voluptate</Address>
        </Ziadatel>
        <Email>exercitation</Email>
        <Phone>enim ex quis</Phone>
    </Body>
</E-form>
`

describe('forms utils', () => {
  test('test validate valid data with XSD schema', () => {
    const xsd =
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="comment"><xs:complexType><xs:all><xs:element name="author" type="xs:string"/><xs:element name="content" type="xs:string"/></xs:all></xs:complexType></xs:element></xs:schema>'
    const xml = '<?xml version="1.0"?><comment><author>author</author><content>nothing</content></comment>'

    const errors = validateDataWithXsd(xml, xsd)
    expect(errors).toHaveLength(0)
  })

  test('test validate invalid data with XSD schema', () => {
    const xsd =
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="comment"><xs:complexType><xs:all><xs:element name="author" type="xs:string"/><xs:element name="content" type="xs:string"/></xs:all></xs:complexType></xs:element></xs:schema>'
    const xml = '<?xml version="1.0"?><comment>A comment</comment>'

    const errors = validateDataWithXsd(xml, xsd)
    expect(errors).toHaveLength(2)
  })

  test('test validate test form with XSD schema', () => {
    const errors = validateDataWithXsd(testXml, testXsd)
    expect(errors).toHaveLength(0)
  })
})
