import SelectOption from './SelectOption'
import cx from 'classnames'

interface DropdownRowProps {
  option: SelectOption
  divider?: boolean
}

const DropdownRow = ({option, divider}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    "flex flex-col w-full h-14 px-5 bg-gray-100 [&>div]:last:border-0"
  )

  const optionClassName = cx(
    "text-p-md",
  )

  // RENDER
  return (
    <div className={rowClassName}>
      <div className="flex flex-col justify-center h-full">
        <p className={optionClassName}>
          {option.label}
        </p>
      </div>
      { divider && <div className="border-b-2 border-form-input-default"/> }
    </div>
  )
}

export default DropdownRow
