import forms, { EFormKey, EFormValue } from '@backend/forms'
import { firstCharToUpper } from '@backend/utils/strings'
import { ajvKeywords, getAllPossibleJsonSchemaProperties, JsonSchema } from '@utils/forms'
import { forceString } from '@utils/utils'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as cheerio from 'cheerio'
// @ts-ignore
import { parseXml } from 'libxmljs2'
import { dropRight, find, last } from 'lodash'
import { parseStringPromise } from 'xml2js'
import { firstCharLowerCase } from 'xml2js/lib/processors'

export type Json = any

export const buildXmlRecursive = (
  currentPath: string[],
  cheerioInstance: cheerio.CheerioAPI,
  node: Json,
  jsonSchema: JsonSchema | undefined,
) => {
  const nodeName = firstCharToUpper(last(currentPath))
  const parentPath = dropRight(currentPath).join(' ')
  // we always edit the last element added - important for arrays in xml, where multiple nodes match the same path
  const parentNode = cheerioInstance(parentPath).last()
  if (parentNode.length === 0)
    throw new Error(`Error, found ${parentNode.length} nodes for path ${parentPath}`)
  if (Array.isArray(node)) {
    // arrays move us one level deeper in json, but do not cause change to xml on their own
    // this will make us add multiple nodes with same name at the same level
    // nested arrays will flatten
    node.forEach((item) => {
      buildXmlRecursive(currentPath, cheerioInstance, item, jsonSchema)
    })
  } else if (node && typeof node === 'object') {
    // objects add one level of nesting to xml
    parentNode.append(`<${nodeName}></${nodeName}>`)

    const properties = getAllPossibleJsonSchemaProperties(jsonSchema)
    if (Object.keys(properties).length === 0) {
      Object.keys(node).forEach((key) => {
        buildXmlRecursive(
          [...currentPath, firstCharToUpper(key)],
          cheerioInstance,
          node[key],
          properties[key],
        )
      })
    } else {
      Object.keys(properties).forEach((key) => {
        if (node[key] !== undefined) {
          buildXmlRecursive(
            [...currentPath, firstCharToUpper(key)],
            cheerioInstance,
            node[key],
            properties[key],
          )
        }
      })
    }
  } else if (node && typeof node === 'string') {
    if (jsonSchema && jsonSchema !== true) {
      const format =
        jsonSchema.type === 'array' ? getFormatFromItems(jsonSchema.items) : jsonSchema.format
      if (format === 'ciselnik') {
        // TODO fill name
        node = `<Code>${node}</Code><Name>${node}</Name><WsEnumCode>${node}</WsEnumCode>`
      } else if (format === 'data-url') {
        node = `<Nazov>${node}</Nazov><Prilozena>true</Prilozena>`
      }
    }

    parentNode.append(`<${nodeName}>${node}</${nodeName}>`)
  } else if (['number', 'boolean'].includes(typeof node)) {
    // only 'basic' types add actual information and not just nesting
    parentNode.append(`<${nodeName}>${node}</${nodeName}>`)
  } else if (node == null) {
    // noop
  } else {
    console.log('Erroneous node:', node)
    throw new Error(
      `Unexpeted node type/value at path ${currentPath.join(' ')}, see the node in logs above.`,
    )
  }
}

export const loadAndBuildXml = (xmlTemplate: string, data: Json, jsonSchema: JsonSchema) => {
  const $ = cheerio.load(xmlTemplate, { xmlMode: true, decodeEntities: false })
  buildXmlRecursive(['E-form', 'Body'], $, data, jsonSchema)
  return $.html()
}

export const xmlToJson = async (data: string, jsonSchema: JsonSchema): Promise<Json> => {
  // xml2js has issues when top level element isn't a single node
  const wrappedXmlString = `<wrapper>${data}</wrapper>`
  const obj = await parseStringPromise(wrappedXmlString, {
    tagNameProcessors: [firstCharLowerCase],
  })
  const body = obj.wrapper['e-form'] ? obj.wrapper['e-form'][0].body[0] : obj.wrapper
  removeNeedlessXmlTransformArraysRecursive(body, [], jsonSchema)
  return body
}

export const getJsonSchemaNodeAtPath = (
  jsonSchema: JsonSchema,
  path: string[],
): JsonSchema | null => {
  let currentNode = jsonSchema
  for (const key of path) {
    const properties = getAllPossibleJsonSchemaProperties(currentNode)
    currentNode = properties[key]
    if (!currentNode) return null
  }
  return currentNode
}

const getFormatFromItems = (items: JsonSchema | JsonSchema[] | undefined): string | undefined => {
  return items && items !== true && !Array.isArray(items) ? items.format : undefined
}

export const removeNeedlessXmlTransformArraysRecursive = (
  obj: any,
  path: string[],
  schema: JsonSchema,
) => {
  if (typeof obj !== 'object') {
    return obj
  }

  Object.keys(obj).forEach((k) => {
    const newPath = [...path, k]

    // skip index of array
    if (Number.isNaN(Number(k))) {
      const childSchema = getJsonSchemaNodeAtPath(schema, newPath)
      if (!childSchema || childSchema === true) {
        if (Array.isArray(obj[k]) && obj[k].length < 2) {
          if (obj[k][0] === 'true') {
            obj[k] = true
          } else if (obj[k][0] === 'false') {
            obj[k] = false
          } else {
            const numValue = Number(obj[k][0])
            if (
              typeof obj[k][0] === 'string' &&
              !obj[k][0].startsWith('+') &&
              !Number.isNaN(numValue)
            ) {
              obj[k] = numValue
            } else {
              obj[k] = obj[k][0]
            }
          }
        }
      } else if (childSchema.type === 'array') {
        const format = getFormatFromItems(childSchema.items)
        if (format === 'data-url') {
          obj[k] = obj[k].map((x: any) => x.nazov[0])
        } else if (format === 'ciselnik') {
          obj[k] = obj[k].map((x: any) => x.code[0])
        }
      } else if (childSchema.type === 'string') {
        if (childSchema.format === 'data-url') {
          obj[k] = obj[k][0].nazov[0]
        } else if (childSchema.format === 'ciselnik') {
          obj[k] = obj[k][0].code[0]
        } else {
          obj[k] = obj[k][0]
        }
      } else if (find(['integer', 'int32', 'int64'], (t) => t === childSchema.type)) {
        obj[k] = Number.parseInt(obj[k][0])
      } else if (find(['float', 'double', 'number'], (t) => t === childSchema.type)) {
        obj[k] = Number.parseFloat(obj[k][0])
      } else if (childSchema.type === 'boolean') {
        // again very forgiving in what we can receive
        obj[k] = obj[k][0] == null ? null : obj[k][0] === 'false' ? false : Boolean(obj[k][0])
      } else {
        obj[k] = obj[k][0]
      }
    }

    removeNeedlessXmlTransformArraysRecursive(obj[k], newPath, schema)
  })

  return obj
}

export const validateDataWithJsonSchema = async (data: any, schema: any) => {
  const ajv = new Ajv({
    keywords: ajvKeywords,
  })

  addFormats(ajv)
  ajv.addFormat('data-url', () => true)
  ajv.addFormat('ciselnik', () => true)

  const validate = ajv.compile(schema)

  try {
    await validate(data)
    return validate.errors || []
  } catch (error) {
    if (!(error instanceof Ajv.ValidationError)) throw error

    return error.errors
  }
}

export const validateDataWithXsd = (data: any, xsd: any) => {
  const xsdDoc = parseXml(xsd)
  const xmlDoc = parseXml(data)

  xmlDoc.validate(xsdDoc)
  return xmlDoc.validationErrors
}

export const getEform = (id: string | string[] | undefined): EFormValue => {
  const formSlug: EFormKey = forceString(id) as any
  const eform: EFormValue = forms[formSlug] as EFormValue

  if (!eform) throw new Error(`Invalid form name - validateFormName returned: ${formSlug}`)
  return eform
}
