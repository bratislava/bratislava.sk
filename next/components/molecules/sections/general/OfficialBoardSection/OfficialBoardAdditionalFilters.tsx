import {
  getOfficialBoardCategoriesQueryKey,
  officialBoardCategoriesFetcher,
} from '@backend/ginis/fetchers/officialBoardCategoriesFetcher'
import { ParsedOfficialBoardCategory } from '@backend/ginis/types'
import SelectField, {
  SelectItem,
} from '@components/forms/widget-components/SelectField/SelectField'
import { useQuery } from '@tanstack/react-query'
import { isDefined } from '@utils/isDefined'
import React from 'react'

type Props = {
  categoryId: string | null
  setCategoryId: (categoryId: string | null) => void
}

const OfficialBoardAdditionalFilters = ({ categoryId, setCategoryId }: Props) => {
  // TODO handle loading and error
  const {
    data: officialBoardCategories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: getOfficialBoardCategoriesQueryKey(),
    queryFn: () => officialBoardCategoriesFetcher(),
    select: (res) => res.data,
  })

  const categorySelectOptions: (Omit<
    ParsedOfficialBoardCategory,
    'numberOfPostedDocuments' | 'numberOfArchivedDocuments'
  > &
    Partial<
      Pick<ParsedOfficialBoardCategory, 'numberOfPostedDocuments' | 'numberOfArchivedDocuments'>
    >)[] = [
    {
      id: 'all',
      title: 'Všetky',
    } as const,
    ...(officialBoardCategories ?? []),
  ]

  return (
    <SelectField
      label="Kategória"
      items={categorySelectOptions}
      selectedKey={categoryId}
      onSelectionChange={(selected) => setCategoryId(selected as string | null | 'all')}
    >
      {(item) => (
        <SelectItem
          label={`${item.title} ${
            isDefined(item.numberOfPostedDocuments) ? ` [${item.numberOfPostedDocuments}]` : ''
          }`}
          id={item.id}
        />
      )}
    </SelectField>
  )
}

export default OfficialBoardAdditionalFilters
