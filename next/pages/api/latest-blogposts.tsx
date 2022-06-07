import { NextApiRequest, NextApiResponse } from 'next'
import { fetchBlogPosts } from '../../utils/blogpost'
import { arrayify } from '../../utils/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const LIMIT = 6
  const tags = (arrayify(req.query.tags)[0] ?? '').split(',').map(Number)
  const offset = Number(arrayify(req.query.offset)[0] ?? 0)
  const posts = await fetchBlogPosts(tags, LIMIT, offset)
  return res.json(posts)
}
