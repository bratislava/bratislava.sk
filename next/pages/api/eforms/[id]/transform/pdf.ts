import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { execFile } from 'node:child_process'
import { readFile, unlink, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { v4 as uuid } from 'uuid'

const fop = async (xsltPath: string, xml: string) => {
  const id: string = uuid()
  const pdfPath = resolve(cwd(), 'fop', 'tmp', `${id}.pdf`)
  const xmlPath = resolve(cwd(), 'fop', 'tmp', `${id}.xml`)

  await writeFile(xmlPath, xml)

  const configPath = resolve(cwd(), 'fop', 'fop.xconf')
  const childArgs = ['-xml', xmlPath, '-xsl', xsltPath, '-pdf', pdfPath, '-c', configPath]

  const isWin = process.platform.startsWith('win')
  const fopPath = resolve(cwd(), 'fop', `fop${isWin ? '.bat' : ''}`)

  return new Promise((resolve, reject) => {
    execFile(fopPath, childArgs, async (error) => {
      if (error) {
        reject(error)
        return
      }

      try {
        const data = await readFile(pdfPath)
        resolve(data)
        await unlink(xmlPath)
        await unlink(pdfPath)
      } catch (error_) {
        reject(error_)
      }
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let eform: EFormValue
  try {
    eform = getEform(req.query.id)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  if (!eform.pdfStylesheetPath) {
    return res.status(400).json({ message: 'PDF stylesheet not exists' })
  }

  const xsltPath = resolve(cwd(), 'backend', 'forms', eform.pdfStylesheetPath)
  const data = await fop(xsltPath, req.body.data)

  res.setHeader('Content-Type', 'application/pdf')
  return res.send(data)
}

export default withSentry(handler)
