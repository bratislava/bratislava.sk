'use client'

import { getCurrentAuthenticatedUser } from '@utils/amplify'
import { useEffect, useState } from 'react'

export const NavBarHeaderAuth = () => {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    const fetchedUser = await getCurrentAuthenticatedUser()
    if (fetchedUser?.attributes) setUser(fetchedUser.attributes)
  }

  useEffect(() => {
    getUser()
  }, [])

  return user ? <p>logged in</p> : null
}
