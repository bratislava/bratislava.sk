import * as SaxonJS from 'saxon-js'

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
