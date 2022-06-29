import { getToken, getUsers } from '@utils/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

let token: string = null

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req
  let users = []
  try {
    if (!token) {
      const { access_token } = await getToken()
      token = access_token
    }

    const { value } = await getUsers({ token, url })
    users = value

    //if token expired
    if (!users || users?.length === 0) {
      const { value } = await getUsers({ token, url })
      users = value
    }
  } catch (e) {
    console.log(e)
  }

  return res.json(users)
}
