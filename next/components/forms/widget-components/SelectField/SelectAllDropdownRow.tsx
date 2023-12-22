import { onEnterOrSpaceKeyDown } from '@utils/onEnterOrSpaceKeyDown'

interface SelectAllDropdownRowProps {
  divider?: boolean
  isEverythingSelected: boolean
  onSelectAll: (isEverythingSelect: boolean) => void
}

const SelectAllDropdownRow = ({
  divider,
  isEverythingSelected,
  onSelectAll,
}: SelectAllDropdownRowProps) => {
  const handleOnClick = () => {
    onSelectAll(isEverythingSelected)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOnClick}
      onKeyUp={onEnterOrSpaceKeyDown(() => handleOnClick)}
      className="flex h-14 w-full cursor-pointer flex-col bg-white px-5 hover:text-gray-600"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-row justify-center">
          <p className="text-default w-full font-semibold">
            {/* Forms translations */}
            {/* {isEverythingSelected ? t('selectAll') : t('deselectAll')} */}
          </p>
        </div>
      </div>
      {divider && <div className="border-b-2" />}
    </div>
  )
}

export default SelectAllDropdownRow
