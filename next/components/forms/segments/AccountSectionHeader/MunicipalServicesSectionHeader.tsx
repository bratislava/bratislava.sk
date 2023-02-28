import { EnumOptionsType } from '@rjsf/utils'
import SelectField from 'components/forms/widget-components/SelectField/SelectField'
import { Dispatch, SetStateAction } from 'react'

type MunicipalServicesSectionHeaderBase = {
  title: string
  selectorValue?: EnumOptionsType[]
  setSelectorValue?: (val: EnumOptionsType[]) => void
  setCurrentPage?: Dispatch<SetStateAction<number>>
  enumOptions: EnumOptionsType[]
}

const MunicipalServicesSectionHeader = ({
  title,
  enumOptions,
  selectorValue,
  setCurrentPage,
  setSelectorValue,
}: MunicipalServicesSectionHeaderBase) => {
  return (
    <div className="bg-gray-50 mt-16 lg:mt-28">
      <span className="flex flex-col justify-end w-full h-full max-w-screen-lg m-auto pl-4 lg:px-0 pt-6 lg:pt-16 pb-4 lg:pb-8">
        <h1 className="text-h1 mb-6">{title}</h1>
        <SelectField
          label=""
          type="multiple"
          value={selectorValue}
          onChange={(val) => {
            setSelectorValue(val)
            setCurrentPage(1)
          }}
          dropdownDivider
          enumOptions={enumOptions}
        />
      </span>
    </div>
  )
}

export default MunicipalServicesSectionHeader
