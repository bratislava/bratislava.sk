import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import Button from '@components/forms/simple-components/Button'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import useCityAccount from '@utils/useCityAccount'

import UserProfilePhoto from '../UserProfilePhoto'

const NavBarAuthHeader = () => {
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { data, signOut } = useCityAccount()

  return data ? (
    <UserProfilePhoto signOut={signOut} userData={data} />
  ) : accountLink ? (
    <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
  ) : (
    <Divider />
  )
}

export default NavBarAuthHeader
