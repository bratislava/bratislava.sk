// @ts-ignore
import * as SaxonJS from 'saxon-js'

/**
 * Returns XSLT 3.0 transformation
 *
 * @remarks
 * To compile a stylesheet held in xslt to a SEF file, use the command line
 * `xslt3 -xsl:schema.xslt -export:schema.sef.json -t`
 *
 * @param xsltPath - Path to Stylesheet in SEF format
 * @param data - Data in XML format
 * @returns transformed data
 */
export const transform = async (xsltPath: string, data: string): Promise<string> => {
  const output = await SaxonJS.transform(
    {
      stylesheetLocation: xsltPath,
      sourceText: data,
      destination: 'serialized',
    },
    'async'
  )

  return output.principalResult
}
