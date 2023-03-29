import type { NextApiRequest, NextApiResponse } from 'next'

type strapiWebhookPayload = {
  model: string
  entry: {
    slug: string
    locale: string
  }
}

function generateUrl(payload: strapiWebhookPayload, slug: string) {
  let url = ``
  if (payload?.entry?.locale === 'en') {
    url += `/en`
  }
  if (slug === 'blog-post') {
    url += `/blog/${payload?.entry?.slug}`
  }
  if (slug === 'page') {
    url += `/${payload?.entry?.slug}`
  }
  return url
}

const handler = async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.STRAPI_REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid tokenn' })
  }

  try {
    // Check model
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload: strapiWebhookPayload = req.body

    switch (payload?.model) {
      case 'blog-post':
        const blogPostUrl = generateUrl(payload, payload?.model)
        await res.revalidate(blogPostUrl)
        break

      case 'page':
        const pageUrl = generateUrl(payload, payload?.model)
        await res.revalidate(pageUrl)
        break

      default:
        break
    }

    return res.json({ revalidated: true })
  } catch (error) {
    console.log('Error while revalidating ==>', error)
    return res.status(500).send('Error revalidating')
  }
}

export default handler
