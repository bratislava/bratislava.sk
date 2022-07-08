import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

import { fetchBlogPosts } from '../../utils/blogpost'
import { arrayify } from '../../utils/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const LIMIT = 6
  const tags = (arrayify(req.query.tags)[0] ?? '').split(',')
  const offset = Number(arrayify(req.query.offset)[0] ?? 0)
  const posts = await fetchBlogPosts(tags, LIMIT, offset)
  return res.json(posts)
}

export default withSentry(handler)
