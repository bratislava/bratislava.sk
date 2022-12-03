// all schemas/xml files should be named and exported from this file
// TODO figure out what we need to export & which files we need for each eform
// TODO figure out whether to store the schema files in this repo or in a different lib

import { UiSchema } from '@rjsf/utils'

import { JsonSchema } from '../utils/forms'
import dopravneZnacenie from './dopravneZnacenie'
import kontajneroveStojiska from './kontajneroveStojiska'
import test from './testForm'
import zavazneStanoviskoKInvesticnejCinnosti from './zavazneStanoviskoKInvesticnejCinnosti'

const eforms = {
  dopravneZnacenie,
  kontajneroveStojiska,
  test,
  zavazneStanoviskoKInvesticnejCinnosti,
}

export type EFormKey = keyof typeof eforms
export interface EFormValue {
  schema: JsonSchema
  uiSchema: UiSchema<any, any>
  xsd: string
  xmlTemplate: string
  textStylesheet?: any
  htmlStylesheet?: any
}

export default eforms
