import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchFacebookPosts } from '../../utils/facebook'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = await fetchFacebookPosts()
  return res.json(posts)
}

export default withSentry(handler)
