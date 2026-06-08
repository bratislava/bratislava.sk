import { Enum_Urbanstudy_Urbanstudytype } from '@/src/services/graphql'
import { useTranslation } from '@/src/utils/useTranslation'

export const useUrbanStudyTypeTranslationMap = () => {
  const { t } = useTranslation()

  return {
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeUrbanistickaStudia]: t(
      'urbanStudyType.urbanistickaStudia',
    ),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeOdvetvovaStudia]: t(
      'urbanStudyType.odvetvovaStudia',
    ),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeUzemnyGenerel]: t('urbanStudyType.uzemnyGenerel'),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeUzemnyPlan]: t('urbanStudyType.uzemnyPlan'),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeUzemnyPlanZony]: t('urbanStudyType.uzemnyPlanZony'),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeUzemnyPlanZmenyADoplnky]: t(
      'urbanStudyType.uzemnyPlanZmenyADoplnky',
    ),
    [Enum_Urbanstudy_Urbanstudytype.UrbanStudyTypeIny]: t('urbanStudyType.iny'),
  } satisfies Record<Enum_Urbanstudy_Urbanstudytype, string>
}

/**
 * Returns a label resolver for urbanStudyType. Handles both the GraphQL enum form
 * (`urbanStudyType_iny`) and the raw Strapi/Meilisearch form (`urbanStudyType.iny`).
 */
export const useUrbanStudyTypeLabel = () => {
  const map = useUrbanStudyTypeTranslationMap()

  return (value: string | null | undefined) => {
    if (!value) {
      return undefined
    }
    const key = value.replace('.', '_') as keyof typeof map

    return map[key]
  }
}
