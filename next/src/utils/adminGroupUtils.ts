import { AdminGroupEntityFragment, Maybe } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

// "City Hall" is a special option that means articles without any assigned admin group
// It is not present in the admin groups list in strapi, so we add it here manually
// TODO Consider adding City Hall as a proper admin group
export const CITY_HALL_ADMINGROUP_SLUG = 'bratislava'

export const useGetCityHallAdminGroup = () => {
  const { t } = useTranslation()

  const CITY_HALL_ADMINGROUP = {
    title: t('adminGroups.cityHall.title'),
    slug: CITY_HALL_ADMINGROUP_SLUG,
  }

  return { CITY_HALL_ADMINGROUP }
}

export const isStarzAdminGroup = (
  adminGroup: Maybe<AdminGroupEntityFragment>,
): adminGroup is AdminGroupEntityFragment => {
  return adminGroup?.slug === 'starz'
}

export const useGetMainAdminGroup = (adminGroups: (AdminGroupEntityFragment | null)[]) => {
  const { CITY_HALL_ADMINGROUP } = useGetCityHallAdminGroup()

  const filteredAdminGroups = adminGroups?.filter(isDefined)

  return filteredAdminGroups?.length ? filteredAdminGroups[0] : CITY_HALL_ADMINGROUP
}
