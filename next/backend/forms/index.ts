// all schemas/xml files should be named and exported from this file
// TODO figure out what we need to export & which files we need for each eform
// TODO figure out whether to store the schema files in this repo or in a different lib

import dopravneZnacenieSchema from './00603481.dopravneZnacenie.sk/schema.json'
import dopravneZnacenieUiSchema from './00603481.dopravneZnacenie.sk/uiSchema.json'
import testSchema from './test/schema.json'
import testUiSchema from './test/uiSchema.json'

const eforms = {
  dopravneZnacenie: {
    schema: dopravneZnacenieSchema,
    uiSchema: dopravneZnacenieUiSchema,
  },
  test: {
    schema: testSchema,
    uiSchema: testUiSchema,
  },
}

export type EFormKey = keyof typeof eforms
export type EFormValue = typeof eforms[EFormKey]

export default eforms
