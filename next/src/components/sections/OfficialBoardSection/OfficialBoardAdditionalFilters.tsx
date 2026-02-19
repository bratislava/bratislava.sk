import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import { getYearsOptions } from '@/src/components/sections/OfficialBoardSection/getYearsOptions'
import {
  getOfficialBoardCategoriesQueryKey,
  officialBoardCategoriesFetcher,
} from '@/src/services/ginis/fetchers/officialBoardCategoriesFetcher'
import {
  OfficialBoardPublicationState,
  ParsedOfficialBoardCategory,
} from '@/src/services/ginis/types'
import { useTranslation } from '@/src/utils/useTranslation'
import { isProductionDeployment } from '@/src/utils/utils' // TODO maybe we shouldn't use czech string for values, but parse them in handler or somewhere else?

// TODO maybe we shouldn't use czech string for values, but parse them in handler or somewhere else?
type Props = {
  categoryId: string | null
  setCategoryId: (categoryId: string | null) => void
  publicationState: OfficialBoardPublicationState
  setPublicationState: React.Dispatch<React.SetStateAction<OfficialBoardPublicationState>>
  publicationYear: string | null
  setPublicationYear: (publicationYear: string | null) => void
}

/*
 *  Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=1225-4788&t=XZg8cNGhorIp1Xx4-4
 */

const OfficialBoardAdditionalFilters = ({
  categoryId,
  setCategoryId,
  publicationState,
  setPublicationState,
  publicationYear,
  setPublicationYear,
}: Props) => {
  const { t } = useTranslation()
  const yearsOptions = useMemo(() => getYearsOptions(), [])

  const allYearsOptions = (publicationStateSelected: string) =>
    publicationStateSelected === 'vyveseno'
      ? [{ id: 'all', title: t('OfficialBoard.allOptions') }, ...yearsOptions]
      : yearsOptions

  // TODO handle loading and error
  const { data: officialBoardCategories } = useQuery({
    queryKey: getOfficialBoardCategoriesQueryKey(),
    queryFn: () => officialBoardCategoriesFetcher(),
    select: (res) => res.data,
  })

  /**
   * This approach makes 'numberOfPostedDocuments' and 'numberOfArchivedDocuments' optional,
   * while keeping the same props as used in ParsedOfficialBoardCategory.
   * It is needed for "all" option, which doesn't have these values.
   */
  const categorySelectOptions: (Omit<
    ParsedOfficialBoardCategory,
    'numberOfPostedDocuments' | 'numberOfArchivedDocuments'
  > &
    Partial<
      Pick<ParsedOfficialBoardCategory, 'numberOfPostedDocuments' | 'numberOfArchivedDocuments'>
    >)[] = [
    {
      id: 'all',
      title: t('OfficialBoard.allOptions'),
    } as const,
    ...(officialBoardCategories ?? []),
  ]

  const publicationStateSelectOptions: {
    id: OfficialBoardPublicationState
    title: string
  }[] = [
    {
      id: 'vyveseno',
      title: t('OfficialBoard.published'),
    },
    {
      id: 'sejmuto',
      title: t('OfficialBoard.archived'),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <SelectField
        label={t('OfficialBoard.category')}
        items={categorySelectOptions}
        selectedKey={categoryId}
        onSelectionChange={(selected) => {
          setCategoryId(selected as string | null | 'all')
        }}
      >
        {(item) => <SelectItem label={item.title} textValue={item.title} id={item.id} />}
      </SelectField>

      {/* TODO remove this check, but for now, we want to test in on staging without being block by accidental release */}
      {isProductionDeployment() ? null : (
        <SelectField
          label={t('OfficialBoard.publicationState')}
          items={publicationStateSelectOptions}
          selectedKey={publicationState as string}
          onSelectionChange={(selected) => {
            setPublicationState(selected as typeof publicationState)
            if (selected === 'sejmuto') {
              setPublicationYear(allYearsOptions(selected)[0].id)
            }
          }}
        >
          {(item) => (
            <SelectItem label={item.title} textValue={item.title} id={item.id as string} />
          )}
        </SelectField>
      )}

      {isProductionDeployment() ? null : (
        <SelectField
          label={t('OfficialBoard.publicationYear')}
          items={allYearsOptions(publicationState as string)}
          selectedKey={publicationYear as string}
          onSelectionChange={(selected) => {
            setPublicationYear(selected as string | null)
          }}
        >
          {(item) => <SelectItem label={item.title} textValue={item.title} id={item.id} />}
        </SelectField>
      )}
    </div>
  )
}

export default OfficialBoardAdditionalFilters
