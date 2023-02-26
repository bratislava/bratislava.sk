import { useTranslation } from 'next-i18next'

interface SelectAllDropdownRowProps {
  divider?: boolean
  selectHashCode?: string
  isEverythingSelected: boolean
  onSelectAll: (isEverythingSelect: boolean) => void
}

const SelectAllDropdownRow = ({
  divider,
  selectHashCode,
  isEverythingSelected,
  onSelectAll,
}: SelectAllDropdownRowProps) => {
  const { t, i18n } = useTranslation('forms')
  const handleOnClick = () => {
    onSelectAll(isEverythingSelected)
  }

  return (
    <div
      className={`${selectHashCode} dropdown flex h-14 w-full cursor-pointer flex-col bg-white px-5 hover:text-gray-600`}
      onClick={handleOnClick}
    >
      <div className={`${selectHashCode} dropdown flex h-full flex-col justify-center`}>
        <div className={`${selectHashCode} dropdown flex flex-row justify-center`}>
          <p className={`${selectHashCode} dropdown text-16-semibold w-full`}>
            {isEverythingSelected ? t('selectAll') : t('deselectAll')}
          </p>
        </div>
      </div>
      {divider && (
        <div className={`${selectHashCode} dropdown border-form-input-default border-b-2`} />
      )}
    </div>
  )
}

export default SelectAllDropdownRow
