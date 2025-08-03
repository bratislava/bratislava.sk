/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'

type Response = { revalidated: boolean } | { message: string } | string
type RequestPayload = { model: string; entry: { slug: string; locale: string } }

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // Check for secret to confirm this is a valid request, NEXT secret is getting from Strapi env variable
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const payload = req.body as RequestPayload

    const localePrefix = payload?.entry?.locale === 'en' ? '/en' : ''
    const homepage = payload?.entry?.locale === 'en' ? '/en' : '/'

    if (payload?.model === 'article') {
      const articleUrl = `${localePrefix}/spravy/${payload?.entry?.slug}`
      console.log('api/revalidate:', articleUrl)
      await res.revalidate(articleUrl)
    }

    if (payload?.model === 'page') {
      const pageUrl = `${localePrefix}/${payload?.entry?.slug}`
      console.log('api/revalidate:', pageUrl)
      await res.revalidate(pageUrl)
    }

    if (payload?.model === 'inba-article') {
      const articleUrl = `${localePrefix}/inba/clanky/${payload?.entry?.slug}`
      console.log('api/revalidate:', articleUrl)
      await res.revalidate(articleUrl)
    }

    if (payload?.model === 'inba-release') {
      const articleUrl = `${localePrefix}/inba/vydania/${payload?.entry?.slug}`
      console.log('api/revalidate:', articleUrl)
      await res.revalidate(articleUrl)
    }

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
