import { useQuery } from '@tanstack/react-query'
import React from 'react'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import {
  getOfficialBoardCategoriesQueryKey,
  officialBoardCategoriesFetcher,
} from '@/src/services/ginis/fetchers/officialBoardCategoriesFetcher'
import {
  OfficialBoardPublicationState,
  ParsedOfficialBoardCategory,
} from '@/src/services/ginis/types'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'
import { isProductionDeployment } from '@/src/utils/utils' // TODO maybe we shouldn't use czech string for values, but parse them in handler or somewhere else?

// TODO maybe we shouldn't use czech string for values, but parse them in handler or somewhere else?
type Props = {
  categoryId: string | null
  setCategoryId: (categoryId: string | null) => void
  publicationState: OfficialBoardPublicationState
  setPublicationState: React.Dispatch<React.SetStateAction<OfficialBoardPublicationState>>
}

const OfficialBoardAdditionalFilters = ({
  categoryId,
  setCategoryId,
  publicationState,
  setPublicationState,
}: Props) => {
  const { t } = useTranslation()

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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SelectField
        label={t('OfficialBoard.category')}
        selectedKey={categoryId}
        onSelectionChange={(selected) => setCategoryId(selected as string | null | 'all')}
      >
        {/* We use .map instead of dynamic `items` to be able to show number of documents depending on publication state  */}
        {categorySelectOptions.map((item) => {
          const numberOfDocuments =
            publicationState === 'vyveseno'
              ? item.numberOfPostedDocuments
              : item.numberOfArchivedDocuments

          return (
            <SelectItem
              key={item.id}
              id={item.id}
              textValue={item.title}
              label={`${item.title}${
                isDefined(numberOfDocuments) ? ` [${numberOfDocuments}]` : ''
              }`}
            />
          )
        })}
      </SelectField>

      {/* TODO remove this check, but for now, we want to test in on staging without being block by accidental release */}
      {isProductionDeployment() ? null : (
        <SelectField
          label={t('OfficialBoard.publicationState')}
          items={publicationStateSelectOptions}
          selectedKey={publicationState}
          onSelectionChange={(selected) => setPublicationState(selected as typeof publicationState)}
        >
          {(item) => <SelectItem label={item.title} id={item.id} />}
        </SelectField>
      )}
    </div>
  )
}

export default OfficialBoardAdditionalFilters
