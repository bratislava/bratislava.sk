import { fetchFacebookPosts } from '../../utils/facebook'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await fetchFacebookPosts()
  return res.json(posts)
}
