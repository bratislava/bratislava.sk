import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as cheerio from 'cheerio'
import { parseXml } from 'libxmljs'
import { dropRight, find, last } from 'lodash'

import { forceString } from '../../utils/utils'
import forms, { EFormKey, EFormValue } from '../forms'
import { firstCharToUpper } from './strings'

export type Json = string | number | boolean | null | { [property: string]: Json } | Json[]

export const buildXmlRecursive = (
  currentPath: string[],
  cheerioInstance: cheerio.CheerioAPI,
  node: Json,
  jsonSchema: JsonSchema | undefined
) => {
  const nodeName = firstCharToUpper(last(currentPath))
  const parentPath = dropRight(currentPath).join(' ')
  // we always edit the last element added - important for arrays in xml, where multiple nodes match the same path
  const parentNode = cheerioInstance(parentPath).last()
  if (parentNode.length === 0) throw new Error(`Error, found ${parentNode.length} nodes for path ${parentPath}`)
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
    Object.keys(node).forEach((key) => {
      const properties = getAllPossibleJsonSchemaProperties(jsonSchema)
      buildXmlRecursive([...currentPath, firstCharToUpper(key)], cheerioInstance, node[key], properties[key])
    })
  } else if (node && typeof node === 'string') {
    if (jsonSchema) {
      const format = jsonSchema.type === 'array' ? jsonSchema.items?.format : jsonSchema.format
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
    throw new Error(`Unexpeted node type/value at path ${currentPath.join(' ')}, see the node in logs above.`)
  }
}

export const loadAndBuildXml = (xmlTemplate: string, data: Json, jsonSchema: JsonSchema) => {
  const $ = cheerio.load(xmlTemplate, { xmlMode: true, decodeEntities: false })
  buildXmlRecursive(['E-form', 'Body'], $, data, jsonSchema)
  return $.html()
}

// simplified JsonSchema, used from package json-schema-xsd-tools
/**
 * JSON schema object
 *
 * Read more about [JSON schema](https://json-schema.org/).
 */
interface JsonSchema {
  type: string
  format?: string
  title?: string
  description?: string
  properties?: JsonSchemaProperties
  items?: JsonSchemaItems
  required?: string[]
  pattern?: string
  enum?: string[]
  then?: JsonSchema
  oneOf?: JsonSchema[]
  anyOf?: JsonSchema[]
  allOf?: JsonSchema[]
}

interface JsonSchemaItems {
  type: string
  format?: string
}

interface JsonSchemaProperties {
  [key: string]: JsonSchema
}

const getAllPossibleJsonSchemaProperties = (jsonSchema: JsonSchema | undefined): JsonSchemaProperties => {
  if (!jsonSchema) {
    return {}
  }

  let properties: JsonSchemaProperties = jsonSchema.properties ?? {}
  if (jsonSchema.then) {
    properties = { ...properties, ...getAllPossibleJsonSchemaProperties(jsonSchema.then) }
  }
  if (jsonSchema.allOf) {
    jsonSchema.allOf.forEach((s) => {
      properties = { ...properties, ...getAllPossibleJsonSchemaProperties(s) }
    })
  }
  if (jsonSchema.oneOf) {
    jsonSchema.oneOf.forEach((s) => {
      properties = { ...properties, ...getAllPossibleJsonSchemaProperties(s) }
    })
  }
  if (jsonSchema.anyOf) {
    jsonSchema.anyOf.forEach((s) => {
      properties = { ...properties, ...getAllPossibleJsonSchemaProperties(s) }
    })
  }

  return properties
}

export const getJsonSchemaNodeAtPath = (jsonSchema: JsonSchema, path: string[]): JsonSchema | null => {
  let currentNode = jsonSchema
  for (const key of path) {
    const properties = getAllPossibleJsonSchemaProperties(currentNode)
    currentNode = properties[key]
    if (!currentNode) return null

    // currentNode.items is of type JsonSchemaItems, not JsonSchema
    // if (properties) {
    //   currentNode = properties[key]
    //   if (!currentNode) return null
    // } else if (currentNode.items) {
    //   // TODO there are edge cases where this should error but produces correct output (i,e key '1stuff' will get converted to 1)
    //   if (Number.isSafeInteger(Number.parseInt(key))) {
    //     currentNode = currentNode.items
    //   } else {
    //     return null
    //   }
    // } else return null
  }
  return currentNode
}

export const removeNeedlessXmlTransformArraysRecursive = (obj: any, path: string[], schema: JsonSchema) => {
  if (typeof obj !== 'object') {
    return obj
  }

  Object.keys(obj).forEach((k) => {
    const newPath = [...path, k]

    // skip index of array
    if(isNaN(k)) {
      const childSchema = getJsonSchemaNodeAtPath(schema, newPath)
      if (!childSchema) {
        console.warn('Did not match schema! Details below')
        console.log('Path:', path)
  
        if (Array.isArray(obj[k]) && obj[k].length < 2) {
          obj[k] = obj[k][0]
        }
      } else if (childSchema.type === 'array') {
        const format = childSchema.items?.format
        if (format === 'data-url') {
          obj[k] = obj[k].map((x) => x.nazov[0])
        } else if (format === 'ciselnik') {
          obj[k] = obj[k].map((x) => x.code[0])
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

// TODO create ajv instance once for BE, add async validations
export const validateDataWithJsonSchema = (data: any, schema: any) => {
  const ajv = new Ajv()
  ajv.addFormat('data-url', () => true)
  ajv.addFormat('ciselnik', () => true)
  addFormats(ajv)

  ajv.addKeyword('example')

  const validate = ajv.compile(schema)
  validate(data)
  return validate.errors || []
}

export const validateDataWithXsd = (data: any, xsd: any) => {
  const xsdDoc = parseXml(xsd)
  const xmlDoc = parseXml(data)

  xmlDoc.validate(xsdDoc)
  return xmlDoc.validationErrors
}

export const getEform = (id: string | string[] | undefined): EFormValue => {
  const formSlug: EFormKey = forceString(id) as any
  const eform: EFormValue = forms[formSlug]

  if (!eform) throw new Error(`Invalid form name - validateFormName returned: ${formSlug}`)
  return eform
}
