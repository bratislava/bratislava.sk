import { withSentry } from '@sentry/nextjs'
import { validateFormName } from '@utils/forms'
import { forceString } from '@utils/utils'
import { execFile } from 'child_process'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { v4 as uuid } from 'uuid'

const fop = async (xsltPath: string, xml: string) => {
  const id = uuid()
  const pdfPath = resolve(cwd(), 'fop', 'tmp', `${id}.pdf`)
  const xmlPath = resolve(cwd(), 'fop', 'tmp', `${id}.xml`)

  await writeFile(xmlPath, xml)

  const configPath = resolve(cwd(), 'fop', 'fop.xconf')
  var childArgs = ['-xml', xmlPath, '-xsl', xsltPath, '-pdf', pdfPath, '-c', configPath]

  var isWin = /^win/.test(process.platform)
  const fopPath = resolve(cwd(), 'fop', `fop${isWin ? '.bat' : ''}`)

  return new Promise((resolve, reject) => {
    execFile(fopPath, childArgs, async (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }

      try {
        const data = await readFile(pdfPath)
        resolve(data)
        // await unlink(xmlPath);
        // await unlink(pdfPath);
      } catch (error) {
        reject(error)
      }
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  try {
    const formName = await validateFormName(req.query.id)
    if (!formName) throw new Error(`Invalid form name - validateFormName returned: ${formName}`)
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  const xsltPath = resolve(cwd(), 'forms', forceString(req.query.id), 'Content', 'form.fo.xslt')
  const data = await fop(xsltPath, req.body.data)

  res.setHeader('Content-Type', 'application/pdf')
  return res.send(data)
}

export default withSentry(handler)
