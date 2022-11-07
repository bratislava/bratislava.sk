import { useTranslation } from 'next-i18next'

interface SelectAllDropdownRowProps {
  divider?: boolean
  onSelectAll: () => void
}

const SelectAllDropdownRow = ({ divider, onSelectAll }: SelectAllDropdownRowProps) => {
  const [t] = useTranslation("forms")

  return (
    <div className="flex h-14 w-full cursor-pointer flex-col bg-white px-5 hover:text-form-black-hover" onClick={onSelectAll}>
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-row justify-center">
          <p className="w-full text-p-md font-semibold">
            { t("selectAll") }
          </p>
        </div>
      </div>
      { divider && <div className="border-b-2 border-form-input-default"/> }
    </div>
  )
}

export default SelectAllDropdownRow
