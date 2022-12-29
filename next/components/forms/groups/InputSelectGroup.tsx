import PlusCircleIcon from '@assets/images/forms/circle-plus-icon.svg'
import field from '@bratislava/ui-bratislava/Field/Field'
import { EnumOptionsType } from '@rjsf/utils'
import { prop } from 'cheerio/lib/api/attributes'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import InputField from '../widget-components/InputField/InputField'
import SelectField from '../widget-components/SelectField/SelectField'

type InputBase = {
  InputLabel: string
  InputPlaceholder?: string
  InputErrorMessage?: string
  InputDescription?: string
  InputClassName?: string
  InputValue?: string
  InputLeftIcon?: 'person' | 'mail' | 'call' | 'lock'
  InputRequired?: boolean
  InputExplicitOptional?: boolean
  InputResetIcon?: boolean
  InputDisabled?: boolean
  InputTooltip?: string
}

interface SelectFieldProps {
  SelectLabel: string
  SelectType?: 'one' | 'multiple' | 'arrow' | 'radio'
  SelectValue?: EnumOptionsType[]
  SelectEnumOptions?: EnumOptionsType[]
  SelectTooltip?: string
  SelectDropdownDivider?: boolean
  SelectSelectAllOption?: boolean
  SelectPlaceholder?: string
  SelectErrorMessage?: string
  SelectDescription?: string
  SelectRequired?: boolean
  SelectExplicitOptional?: boolean
  SelectDisabled?: boolean
  SelectClassName?: string
  SelectOnChange: (values: EnumOptionsType[]) => void
}

export const InputSelectGroup = ({
  groupValues = [],
  saveFormData,
  propKeys,

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

  // select props
  SelectLabel,
  SelectType = 'one',
  SelectValue,
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

  addNew,
}: SelectFieldProps &
  InputBase & {
    addNew: string
    groupValues?: Array<any>
    saveFormData: (obj: Array<any>) => void
    propKeys: Array<string>
  }) => {
  const [fieldGroups, setFieldGroups] = useState([...groupValues])
  const containerStyle = cx('flex flex-col items-start gap-4', {})

  const addField = () => {
    setFieldGroups([...fieldGroups, { [propKeys[0]]: '', [propKeys[1]]: [], id: uuidv4() }])
  }

  const removeField = (id: string) => {
    setFieldGroups((current) => current.filter((element) => element.id !== id))
  }

  const updateState = (index: number, propIndex: 0 | 1) => (e: string | undefined | Array<any>) => {
    const newArray = fieldGroups.map((item, i) => {
      return index === i ? { ...item, [propKeys[propIndex]]: e } : item
    })
    setFieldGroups(newArray)
  }

  useEffect(() => {
    setFieldGroups((prev: Array<object>) => {
      // to avoid render warning
      setTimeout(() => {
        saveFormData([...prev])
      }, 0)
      return prev
    })
  }, [fieldGroups])

  return (
    <div className={containerStyle}>
      {fieldGroups.map((element, index) => {
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
                value={element[propKeys[0]]}
                onChange={updateState(index, 0)}
              />
            </div>
            <SelectField
              label={SelectLabel}
              type="one"
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
              value={element[propKeys[1]]}
              onChange={updateState(index, 1)}
              className={SelectClassName}
            />
            {fieldGroups.length > 1 ? (
              <div
                className="flex w-6 h-6 justify-center items-center cursor-pointer mt-auto mb-5 rotate-45"
                onClick={() => removeField(element.id)}
              >
                <PlusCircleIcon fill="red" />
              </div>
            ) : null}
          </div>
        )
      })}
      <div className="py-0 pr-0 pl-8">
        <div
          className="flex flex-row justify-center select-none items-center px-0 py-2 gap-2 cursor-pointer"
          onClick={() => addField()}
        >
          <div className="flex w-6 h-6 justify-center items-center">
            <PlusCircleIcon fill="black" />
          </div>
          <div className="text-xl font-semibold leading-6 not-italic">{addNew}</div>
        </div>
      </div>
    </div>
  )
}
