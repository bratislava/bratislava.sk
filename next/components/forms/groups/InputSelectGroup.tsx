import PlusCircleIcon from '@assets/images/forms/circle-plus-icon.svg'
import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import React from 'react'

import InputField, { InputBase } from '../widget-components/InputField/InputField'
import SelectField, { SelectFieldProps } from '../widget-components/SelectField/SelectField'

type InputBase1 = {
  InputLabel: InputBase['label']
  InputPlaceholder?: InputBase['placeholder']
  InputErrorMessage?: InputBase['errorMessage']
  InputDescription?: InputBase['description']
  InputClassName?: InputBase['className']
  InputLeftIcon?: InputBase['leftIcon']
  InputRequired?: InputBase['required']
  InputExplicitOptional?: InputBase['explicitOptional']
  InputResetIcon?: InputBase['resetIcon']
  InputDisabled?: InputBase['disabled']
  InputTooltip?: InputBase['tooltip']
  InputOnChange?: (index: number, propIndex: 0 | 1, value?: string | undefined) => void
}

interface SelectFieldProps1 {
  SelectLabel: SelectFieldProps['label']
  SelectType?: SelectFieldProps['type']
  SelectValue?: SelectFieldProps['value']
  SelectEnumOptions?: SelectFieldProps['enumOptions']
  SelectTooltip?: SelectFieldProps['tooltip']
  SelectDropdownDivider?: SelectFieldProps['dropdownDivider']
  SelectSelectAllOption?: SelectFieldProps['selectAllOption']
  SelectPlaceholder?: SelectFieldProps['placeholder']
  SelectErrorMessage?: SelectFieldProps['errorMessage']
  SelectDescription?: SelectFieldProps['description']
  SelectRequired?: SelectFieldProps['required']
  SelectExplicitOptional?: SelectFieldProps['explicitOptional']
  SelectDisabled?: SelectFieldProps['disabled']
  SelectClassName?: SelectFieldProps['className']
  SelectOnChange: (index: number, propIndex: 0 | 1, value: any | any[]) => void
}

type mainObjectType = {
  id: string
  [key: string]: string | string[] | EnumOptionsType[] | EnumOptionsType[][]
}

export const InputSelectGroup = ({
  groupValues = [],
  addNew,
  propKeys,
  addField,
  removeField,

  // input props
  InputLabel,
  InputPlaceholder,
  InputDescription,
  InputClassName,
  InputTooltip,
  InputLeftIcon,
  InputResetIcon,
  InputRequired,
  InputErrorMessage,
  InputDisabled,
  InputOnChange,

  // select props
  SelectLabel,
  SelectType = 'one',
  SelectEnumOptions,
  SelectTooltip,
  SelectDropdownDivider,
  SelectSelectAllOption,
  SelectPlaceholder,
  SelectErrorMessage,
  SelectDescription,
  SelectRequired,
  SelectExplicitOptional,
  SelectDisabled,
  SelectClassName,
  SelectOnChange,
}: SelectFieldProps1 &
  InputBase1 & {
    addNew: string
    groupValues?: mainObjectType[]
    addField?: () => void
    removeField?: (id: string) => void
    propKeys: string[]
  }) => {
  const containerStyle = cx('flex flex-col items-start gap-4', {})

  return (
    <div className={containerStyle}>
      {groupValues.map((element, index) => {
        return (
          <div key={index} className="flex flex-row items-start gap-4 h-full">
            <div className="flex relative flex-col items-start pt-3 w-3 ">
              <div className="bg-gray-200 w-0.5 h-[50px]" />
              <div className="w-3 h-0.5 bg-gray-200" />
            </div>
            <div className={InputClassName}>
              <InputField
                label={InputLabel}
                placeholder={InputPlaceholder ?? ''}
                description={InputDescription}
                tooltip={InputTooltip}
                leftIcon={InputLeftIcon}
                required={InputRequired}
                resetIcon={InputResetIcon}
                errorMessage={InputErrorMessage}
                disabled={InputDisabled}
                value={element[propKeys[0]] as string}
                onChange={(e) => InputOnChange && InputOnChange(index, 0, e)}
              />
            </div>
            <SelectField
              label={SelectLabel}
              type={SelectType}
              enumOptions={SelectEnumOptions}
              disabled={SelectDisabled}
              tooltip={SelectTooltip}
              placeholder={SelectPlaceholder}
              errorMessage={SelectErrorMessage}
              description={SelectDescription}
              required={SelectRequired}
              explicitOptional={SelectExplicitOptional}
              dropdownDivider={SelectDropdownDivider}
              selectAllOption={SelectSelectAllOption}
              value={element[propKeys[1]] as EnumOptionsType[]}
              onChange={(e) => SelectOnChange && SelectOnChange(index, 1, e)}
              className={SelectClassName}
            />
            {groupValues.length > 1 ? (
              <button
                type="button"
                className="flex w-6 h-6 justify-center items-center cursor-pointer mt-auto mb-5 rotate-45"
                onClick={() => removeField && removeField(element.id)}
              >
                <PlusCircleIcon fill="red" />
              </button>
            ) : null}
          </div>
        )
      })}
      <div className="pl-8">
        <button
          type="button"
          className="flex flex-row justify-center select-none items-center py-2 gap-2 cursor-pointer"
          onClick={() => addField && addField()}
        >
          <div className="flex w-6 h-6 justify-center items-center">
            <PlusCircleIcon fill="black" />
          </div>
          <div className="text-xl font-semibold leading-6 not-italic">{addNew}</div>
        </button>
      </div>
    </div>
  )
}
