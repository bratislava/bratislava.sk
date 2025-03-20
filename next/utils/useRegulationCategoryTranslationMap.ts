import { Enum_Regulation_Category } from '@/services/graphql'
import { useTranslation } from '@/utils/useTranslation'

export const useRegulationCategoryTranslationMap = () => {
  const { t } = useTranslation()

  return {
    archiv: t('Regulation.category.archiv'),
    daneAPoplatky: t('Regulation.category.daneAPoplatky'),
    hospodarenie: t('Regulation.category.hospodarenie'),
    ostatne: t('Regulation.category.ostatne'),
    pomenovanieUlic: t('Regulation.category.pomenovanieUlic'),
    poriadokACistota: t('Regulation.category.poriadokACistota'),
    socialnaPomocASkolstvo: t('Regulation.category.socialnaPomocASkolstvo'),
    uzemnePlanovanie: t('Regulation.category.uzemnePlanovanie'),
  } satisfies Record<Enum_Regulation_Category, string>
}
