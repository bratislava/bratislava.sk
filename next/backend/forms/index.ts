// all schemas/xml files should be named and exported from this file
// TODO figure out what we need to export & which files we need for each eform
// TODO figure out whether to store the schema files in this repo or in a different lib

import dopravneZnacenieHtmlStylesheet from './00603481.dopravneZnacenie.sk/form.html.sef.json'
import dopravneZnacenieTextStylesheet from './00603481.dopravneZnacenie.sk/form.sb.sef.json'
import dopravneZnacenieSchema from './00603481.dopravneZnacenie.sk/schema.json'
import dopravneZnacenieXsd from './00603481.dopravneZnacenie.sk/schema.xsd'
import dopravneZnacenieUiSchema from './00603481.dopravneZnacenie.sk/uiSchema.json'
import dopravneZnacenieXmlTemplate from './00603481.dopravneZnacenie.sk/xmlTemplate'
import testSchema from './test/schema.json'
import testXsd from './test/schema.xsd'
import testUiSchema from './test/uiSchema.json'
import testXmlTemplate from './test/xmlTemplate'

const eforms = {
  dopravneZnacenie: {
    schema: dopravneZnacenieSchema,
    uiSchema: dopravneZnacenieUiSchema,
    xsd: dopravneZnacenieXsd,
    xmlTemplate: dopravneZnacenieXmlTemplate,
    textStylesheet: dopravneZnacenieTextStylesheet,
    htmlStylesheet: dopravneZnacenieHtmlStylesheet,
  },
  test: {
    schema: testSchema,
    uiSchema: testUiSchema,
    xsd: testXsd,
    xmlTemplate: testXmlTemplate,
    textStylesheet: null,
    htmlStylesheet: null,
  },
}

export type EFormKey = keyof typeof eforms
export type EFormValue = typeof eforms[EFormKey]

export default eforms
