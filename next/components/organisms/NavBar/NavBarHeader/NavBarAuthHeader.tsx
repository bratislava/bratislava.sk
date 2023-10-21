import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import Button from '@components/forms/simple-components/Button'
import { useUser } from '@utils/amplify'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'

import UserProfilePhoto from '../UserProfilePhoto'

const NavBarAuthHeader = () => {
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { user, signOut } = useUser()

  return user ? (
    <UserProfilePhoto signOut={signOut} userData={user.attributes} />
  ) : accountLink ? (
    <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
  ) : (
    <Divider />
  )
}

export default NavBarAuthHeader
