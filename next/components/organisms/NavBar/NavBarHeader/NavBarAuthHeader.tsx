import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import Button from '@components/forms/simple-components/Button'
import { useUser } from '@components/providers/ServerSideAuthProvider'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'

import UserProfilePhoto from '../UserProfilePhoto'

const NavBarAuthHeader = () => {
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { user, signOut } = useUser((state) => {
    console.log('initStore', state)
    return state.userData
  })

  return user ? (
    <UserProfilePhoto signOut={signOut} userData={user} />
  ) : accountLink ? (
    <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
  ) : (
    <Divider />
  )
}

export default NavBarAuthHeader
