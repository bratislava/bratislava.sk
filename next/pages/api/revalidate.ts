import type { NextApiRequest, NextApiResponse } from 'next'

type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload = { model: string; entry: { slug: string; locale: string } }

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.STRAPI_REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload

    const localePrefix = payload.entry.locale === 'en' ? '/en' : ''

    if (payload?.model === 'blog-post') {
      const blogUrl = `${localePrefix}/blog/${payload?.entry?.slug}`
      console.log('api/revalidate:', blogUrl)
      await res.revalidate(blogUrl)
    }

    if (payload?.model === 'page') {
      const pageUrl = `${localePrefix}/${payload?.entry?.slug}`
      console.log('api/revalidate:', pageUrl)
      await res.revalidate(pageUrl)
    }

    /** Always revalidate index */
    console.log('api/revalidate:', `${localePrefix}/`)
    await res.revalidate(`${localePrefix}/`)

    return res.json({ revalidated: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('api/revalidate: Error while revalidating ==>', error)
    return res.status(500).send('Error revalidating')
  }
}

export default handler
