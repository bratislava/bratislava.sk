import { useTranslation } from 'next-i18next'

interface SelectAllDropdownRowProps {
  divider?: boolean
  selectHashCode?: string
  onSelectAll: () => void
}

const SelectAllDropdownRow = ({ divider, selectHashCode, onSelectAll }: SelectAllDropdownRowProps) => {
  const [t] = useTranslation("forms")

  return (
    <div className={`${selectHashCode} dropdown flex h-14 w-full cursor-pointer flex-col bg-white px-5 hover:text-gray-600`} onClick={onSelectAll}>
      <div className={`${selectHashCode} dropdown flex h-full flex-col justify-center`}>
        <div className={`${selectHashCode} dropdown flex flex-row justify-center`}>
          <p className={`${selectHashCode} dropdown w-full text-20-semibold`}>
            { t("selectAll") }
          </p>
        </div>
      </div>
      { divider && <div className={`${selectHashCode} dropdown border-b-2 border-form-input-default`}/> }
    </div>
  )
}

export default SelectAllDropdownRow
