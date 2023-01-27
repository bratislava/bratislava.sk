import data from './zavazneStanoviskoKInvesticnejCinnosti/data.json'
import htmlStylesheet from './zavazneStanoviskoKInvesticnejCinnosti/form.html.sef.json'
import textStylesheet from './zavazneStanoviskoKInvesticnejCinnosti/form.sb.sef.json'
import schema from './zavazneStanoviskoKInvesticnejCinnosti/schema.json'
import xsd from './zavazneStanoviskoKInvesticnejCinnosti/schema.xsd'
import uiSchema from './zavazneStanoviskoKInvesticnejCinnosti/uiSchema.json'
import xmlTemplate from './zavazneStanoviskoKInvesticnejCinnosti/xmlTemplate'

export default {
  schema,
  uiSchema,
  xsd,
  xmlTemplate,
  textStylesheet,
  htmlStylesheet,
  data,
  pdfStylesheetPath: 'zavazneStanoviskoKInvesticnejCinnosti/form.fo.xslt',
}
