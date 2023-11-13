import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import LoadingSpinner from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import Button from '@components/forms/simple-components/Button'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import useCityAccount from '@utils/useCityAccount'

import UserProfilePhoto from '../UserProfilePhoto'

const NavBarAuthHeader = () => {
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { data, loading } = useCityAccount()

  return loading ? (
    <LoadingSpinner size="small" />
  ) : data ? (
    <UserProfilePhoto userData={data} />
  ) : accountLink ? (
    <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
  ) : (
    <Divider />
  )
}

export default NavBarAuthHeader
