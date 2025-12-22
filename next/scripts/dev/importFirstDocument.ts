/* eslint-disable no-console */
/**
 * Imports first file from CSV into Strapi using GraphQL
 *
 * Usage:
 * 1. Install dependencies: npm install form-data --save-dev
 * 2. Ensure NEXT_PUBLIC_STRAPI_URL is set in .env.local
 * 3. Run: npx ts-node scripts/dev/importFirstDocument.ts
 *
 * Note: You may need to set up API token authentication if Strapi requires it.
 * Check Strapi settings -> API Tokens and add token to .env.local as STRAPI_API_TOKEN
 */
import * as fs from 'node:fs'
import path from 'node:path'

import axios from 'axios'
import dotenv from 'dotenv'
// eslint-disable-next-line import/no-extraneous-dependencies -- form-data needs to be installed: npm install form-data --save-dev
import FormData from 'form-data'
import { gql, GraphQLClient } from 'graphql-request'

// Load envs
dotenv.config({ path: '.env.local' })

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const graphqlClient = new GraphQLClient(`${strapiBaseUrl}/graphql`)

// Set authorization header if API token is available
if (process.env.STRAPI_API_TOKEN) {
  graphqlClient.setHeader('Authorization', `Bearer ${process.env.STRAPI_API_TOKEN}`)
}

interface CsvRow {
  fileName: string
  format: string
  mimeType: string
  fileUrl: string
  dateOfCreation: string
  oldCategory: string
  clarifiedOldCategory: string
  newCategory: string
  id: string
  documentId: string
  description: string
  isFromAdditionalScraping: string
}

const parseCsvRow = (line: string): CsvRow | null => {
  // Simple CSV parser - handles quoted fields
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current) // Last field

  if (fields.length < 12) return null

  return {
    fileName: fields[0] || '',
    format: fields[1] || '',
    mimeType: fields[2] || '',
    fileUrl: fields[3] || '',
    dateOfCreation: fields[4] || '',
    oldCategory: fields[5] || '',
    clarifiedOldCategory: fields[6] || '',
    newCategory: fields[7] || '',
    id: fields[8] || '',
    documentId: fields[9] || '',
    description: fields[10] || '',
    isFromAdditionalScraping: fields[11] || '',
  }
}

const downloadFile = async (url: string): Promise<Buffer> => {
  console.log(`Downloading file from: ${url}`)
  const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30_000 })

  return Buffer.from(response.data)
}

const uploadToStrapi = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<number> => {
  console.log(`Uploading to Strapi: ${fileName}`)

  const formData = new FormData()
  // Append file buffer with filename - form-data package accepts (field, value, options)
  formData.append('files', fileBuffer, {
    filename: fileName,
    contentType: mimeType,
  })

  // Optionally add fileInfo as JSON string (name, alternativeText, caption)
  // const fileInfo = {
  //   name: fileName,
  //   alternativeText: fileName,
  // }
  // formData.append('fileInfo', JSON.stringify(fileInfo))

  const headers: Record<string, string> = {
    ...formData.getHeaders(),
  }

  // // Add API token if available
  // if (process.env.STRAPI_API_TOKEN) {
  //   headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`
  // }

  try {
    const response = await axios.post(`${strapiBaseUrl}/api/upload`, formData, {
      headers,
      timeout: 60_000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })

    // Strapi returns array of uploaded files
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Invalid response from Strapi upload endpoint')
    }

    const uploadedFile = response.data[0]
    if (!uploadedFile || !uploadedFile.id) {
      throw new Error('Uploaded file missing ID in response')
    }

    console.log(`Uploaded file ID: ${uploadedFile.id}`)

    return uploadedFile.id
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Upload error response:', error.response?.data)
      console.error('Upload error status:', error.response?.status)
    }
    throw error
  }
}

const CREATE_DOCUMENT_MUTATION = gql`
  mutation createDocument($data: DocumentInput!) {
    createDocument(data: $data) {
      documentId
      title
    }
  }
`

const createDocument = async (row: CsvRow, fileId: number): Promise<void> => {
  console.log(`Creating document: ${row.fileName}`)

  const documentData = {
    title: row.fileName,
    files: [fileId.toString()],
    description: row.description || null,
    documentCategory: row.documentId || null,
  }

  const variables = {
    data: documentData,
  }

  const result = await graphqlClient.request<{
    createDocument: { documentId: string; title: string }
  }>(CREATE_DOCUMENT_MUTATION, variables)

  console.log(`Created document ID: ${result.createDocument.documentId}`)
  console.log(
    `Document URL: ${strapiBaseUrl}/admin/content-manager/collection-types/api::document.document/${result.createDocument.documentId}`,
  )
}

const main = async () => {
  const csvPath = path.join(process.cwd(), 'next/scripts/dev/starz_files_export.csv')

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`)
    process.exit(1)
  }

  console.log(`Reading CSV: ${csvPath}`)
  const csvContent = fs.readFileSync(csvPath, 'utf8')
  const lines = csvContent.split('\n').filter((line) => line.trim())

  if (lines.length < 2) {
    console.error('CSV file must have at least a header and one data row')
    process.exit(1)
  }

  // Skip header, get first row
  const firstRow = parseCsvRow(lines[1])
  if (!firstRow) {
    console.error('Failed to parse first row')
    process.exit(1)
  }

  console.log('\n=== Processing first file ===')
  console.log(`File: ${firstRow.fileName}`)
  console.log(`URL: ${firstRow.fileUrl}`)
  console.log(`Category: ${firstRow.newCategory} (ID: ${firstRow.documentId})`)
  console.log(`Description: ${firstRow.description.slice(0, 100)}...`)

  try {
    // Download file
    const fileBuffer = await downloadFile(firstRow.fileUrl)

    // Upload to Strapi
    const fileId = await uploadToStrapi(fileBuffer, firstRow.fileName, firstRow.mimeType)

    // Create document
    await createDocument(firstRow, fileId)

    console.log('\n✅ Success!')
  } catch (error) {
    console.error('\n❌ Error:', error)
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data)
    }
    process.exit(1)
  }
}

main().catch(console.error)
