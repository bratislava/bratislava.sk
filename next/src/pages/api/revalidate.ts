/* eslint-disable no-console,sonarjs/no-duplicate-string */
import type { NextApiRequest, NextApiResponse } from 'next'

type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload = { model: string; entry: { slug: string; locale: string } }

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // Check for secret to confirm this is a valid request, NEXT secret is getting from Strapi env variable
  console.log('api/revalidate: strap - next', req.query.secret, process.env.REVALIDATE_SECRET_TOKEN)
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload

    console.log('api/revalidate: payload ==>', payload)
    const localePrefix = payload?.entry?.locale === 'en' ? '/en' : ''

    console.log('api/revalidate: localePrefix ==>', localePrefix)
    const homepage = payload?.entry?.locale === 'en' ? '/en' : '/'
    console.log('api/revalidate: homepage ==>', homepage)

    if (payload?.model === 'blog-post') {
      const blogUrl = `${localePrefix}/blog/${payload?.entry?.slug}`
      console.log('api/revalidate:', blogUrl)
      await res.revalidate(blogUrl)
    }

    console.log('api/revalidate: blogPost')

    if (payload?.model === 'page') {
      const pageUrl = `${localePrefix}/${payload?.entry?.slug}`
      console.log('api/revalidate:', pageUrl)
      await res.revalidate(pageUrl)
    }

    console.log('api/revalidate: page')

    /** Always revalidate homepage */
    console.log('api/revalidate:', homepage)
    await res.revalidate(homepage)

    return res.json({ revalidated: true })
  } catch (error) {
    console.log('api/revalidate: Error while revalidating ==>', error)

    return res.status(500).send('Error revalidating')
  }
}

export default handler
