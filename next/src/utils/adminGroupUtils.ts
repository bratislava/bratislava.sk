import { AdminGroupSlugEntityFragment, Maybe } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

// "City Hall" is a special option that means articles without any assigned admin group
// It is not present in the admin groups list in strapi, so we add it here manually
// TODO Consider adding City Hall as a proper admin group
export const CITY_HALL_ADMINGROUP_SLUG = 'bratislava'

export const useGetCityHallAdminGroup = () => {
  const { t } = useTranslation()

  const CITY_HALL_ADMINGROUP: AdminGroupSlugEntityFragment = {
    // TODO documentId is added just to satisfy the type, consider a better solution
    documentId: CITY_HALL_ADMINGROUP_SLUG,
    title: t('AdminGroups.cityHall.title'),
    slug: CITY_HALL_ADMINGROUP_SLUG,
  }

  return { CITY_HALL_ADMINGROUP }
}

export const useGetMainAdminGroup = (adminGroups: (AdminGroupSlugEntityFragment | null)[]) => {
  const { CITY_HALL_ADMINGROUP } = useGetCityHallAdminGroup()

  return adminGroups?.filter(isDefined)[0] ?? CITY_HALL_ADMINGROUP
}

export const isStarzAdminGroup = (
  adminGroup: Maybe<AdminGroupSlugEntityFragment>,
): adminGroup is AdminGroupSlugEntityFragment => {
  return adminGroup?.slug === 'starz'
}

export const isCityHallAdminGroup = (adminGroup: AdminGroupSlugEntityFragment) => {
  return adminGroup?.slug === CITY_HALL_ADMINGROUP_SLUG
}
