import { getToken, getUsers } from '@utils/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

let token: string = null

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let users = []
  try {
    if (!token) {
      const { access_token } = await getToken()
      token = access_token
    }

    const { value } = await getUsers({ token })
    users = value
  } catch (e) {
    console.log(e)
  }

  return res.json(users)
}
