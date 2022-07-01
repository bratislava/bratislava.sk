import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid tokenn' })
  }

  try {
    // Check model
    const payload = req.body;
    if (payload?.model === 'blog-post') {
      const blogPostUrl = `/blog/${payload?.entry?.slug}`;
      await res.unstable_revalidate(blogPostUrl);
    }

    if (payload?.model === 'page') {
      const pageUrl = `/${payload?.entry?.slug}`;
      await res.unstable_revalidate(pageUrl);
    }

    return res.json({ revalidated: true })
  } catch (error) {
    console.log("Error while revalidating ==>", error)
    return res.status(500).send('Error revalidating')
  }
}