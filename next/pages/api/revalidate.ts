import type { NextApiRequest, NextApiResponse } from 'next'

type strapiWebhookPayload = {
  model: string;
  entry: {
    slug: string;
    locale: string;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid tokenn' })
  }

  try {
    // Check model
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload: strapiWebhookPayload = req.body;

    console.log(payload.model)
    switch(payload?.model) {
      case 'blog-post': {
        let blogPostUrl = ``;
        if (payload?.entry?.locale === 'en') {
          blogPostUrl += `/en`
        };
        blogPostUrl += `/blog/${payload?.entry?.slug}`;
        await res.unstable_revalidate(blogPostUrl);
      }

      case 'page': {
        let pageUrl = ``;
        if (payload?.entry?.locale === 'en') {
          pageUrl += `/en`
        };
        pageUrl = `/${payload?.entry?.slug}`;
        await res.unstable_revalidate(pageUrl);
      }

      default:
        break;
    }

    return res.json({ revalidated: true })
  } catch (error) {
    console.log("Error while revalidating ==>", error)
    return res.status(500).send('Error revalidating')
  }
}