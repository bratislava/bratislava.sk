import { fetchFacebookPosts } from '../../utils/facebook'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await fetchFacebookPosts()
  return res.json(posts)
}

export default withSentry(handler)
