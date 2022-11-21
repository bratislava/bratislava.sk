import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as cheerio from 'cheerio'
import { parseXml } from 'libxmljs'
import { dropRight, find, last } from 'lodash'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { forceString } from '../../utils/utils'
import forms, { EFormKey, EFormValue } from '../forms'
import { firstCharToUpper } from './strings'

export type Json = string | number | boolean | null | { [property: string]: Json } | Json[]

export const buildXmlRecursive = (currentPath: string[], cheerioInstance: cheerio.CheerioAPI, node: Json) => {
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
      buildXmlRecursive(currentPath, cheerioInstance, item)
    })
  } else if (node && typeof node === 'object') {
    // objects add one level of nesting to xml
    parentNode.append(`<${nodeName}></${nodeName}>`)
    Object.keys(node).forEach((key) => {
      buildXmlRecursive([...currentPath, firstCharToUpper(key)], cheerioInstance, node[key])
    })
  } else if (['string', 'number', 'boolean'].includes(typeof node)) {
    // only 'basic' types add actual information and not just nesting
    // TODO handle decimal numbers
    parentNode.append(`<${nodeName}>${node}</${nodeName}>`)
  } else if (node == null) {
    // noop
  } else {
    console.log('Erroneous node:', node)
    throw new Error(`Unexpeted node type/value at path ${currentPath.join(' ')}, see the node in logs above.`)
  }
}

// TODO typing for schema
// does not support oneOf / allOf / anyOf etc
export const getJsonSchemaNodeAtPath = (jsonSchema: any, path: string[]) => {
  let currentNode = jsonSchema
  for (const key of path) {
    if (currentNode.properties) {
      currentNode = currentNode.properties[key]
      if (!currentNode) return null
    } else if (currentNode.items) {
      // TODO there are edge cases where this should error but produces correct output (i,e key '1stuff' will get converted to 1)
      if (Number.isSafeInteger(Number.parseInt(key))) {
        currentNode = currentNode.items
      } else {
        return null
      }
    } else return null
  }
  return currentNode
}

export const removeNeedlessXmlTransformArraysRecursive = (obj: any, path: string[], schema: any) => {
  if (typeof obj !== 'object') return obj
  Object.keys(obj).forEach((k) => {
    const newPath = [...path, k]
    const schemaType = getJsonSchemaNodeAtPath(schema, newPath)?.type
    if (!schemaType) {
      // TODO here we're forgiving and just do nothing if we do not match type in schema - but we may want to error in these cases
      console.warn('Did not match schema! Details below')
      console.log('Path:', path)
      console.dir(schema, { depth: 10 })
    }
    // because you can repeat each node any number of times in xml, everything is nested in arrays
    if (Array.isArray(obj[k]) && obj[k].length < 2 && schemaType !== 'array') {
      // this is the only time we modify the output of xml->json transform structure
      // any other potential errors we'll fail upon validation
      obj[k] = obj[k][0]

      if (schemaType) {
        // parse non-string basic types
        // TODO [].find kept throwing error ?
        if (find(['integer', 'int32', 'int64'], (t) => t === schemaType)) {
          obj[k] = Number.parseInt(obj[k])
        }
        if (find(['float', 'double'], (t) => t === schemaType)) {
          obj[k] = Number.parseFloat(obj[k])
        }
        if (find(['boolean'], (t) => t === schemaType)) {
          // again very forgiving in what we can receive
          obj[k] = obj[k] == null ? null : obj[k] === 'false' ? false : Boolean(obj[k])
        }
      }
    }
    removeNeedlessXmlTransformArraysRecursive(obj[k], newPath, schema)
  })
  return obj
}

export const validateAndBuildXmlData = async (data: any, formName: unknown) => {
  // TODO SANITIZE!
  const validFormName = forceString(formName)
  // test if directory existts
  await access(resolve(cwd(), 'forms', validFormName))
  // TODO validate
  const validData = data
  const filePath = resolve(cwd(), 'forms', validFormName, 'template.xml')
  const fileBuffer = await readFile(filePath)
  const $ = cheerio.load(fileBuffer, { xmlMode: true })
  buildXmlRecursive(['E-form', 'Body'], $, validData)
  return { xml: $.html(), name: validFormName }
}

// TODO create ajv instance once for BE, add async validations
export const validateDataWithJsonSchema = (data: any, schema: any) => {
  const ajv = new Ajv()
  addFormats(ajv)
  const validate = ajv.compile(schema)
  validate(data)
  return validate.errors
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
