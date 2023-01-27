import data from './zastitaPrimatora/data.json'
import htmlStylesheet from './zastitaPrimatora/form.html.sef.json'
import textStylesheet from './zastitaPrimatora/form.sb.sef.json'
import schema from './zastitaPrimatora/schema.json'
import xsd from './zastitaPrimatora/schema.xsd'
import uiSchema from './zastitaPrimatora/uiSchema.json'
import xmlTemplate from './zastitaPrimatora/xmlTemplate'

export default {
  schema,
  uiSchema,
  xsd,
  xmlTemplate,
  textStylesheet,
  htmlStylesheet,
  data,
  pdfStylesheetPath: 'zastitaPrimatora/form.fo.xslt',
}
