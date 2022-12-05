import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import InputField from '../InputField'
import SelectField from '../SelectField/SelectField'

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
  SelectOnChange,

  addNew,
}: SelectFieldProps & InputBase & { addNew: string }) => {
  const [fieldGroups, setFieldGroups] = useState([
    { inputField: '', selectField: [], id: uuidv4() },
  ])
  const containerStyle = cx('flex flex-col items-start p-0 gap-4', {})

  const addField = () => {
    setFieldGroups([...fieldGroups, { inputField: '', selectField: [], id: uuidv4() }])
  }

  const removeField = (id: string) => {
    setFieldGroups((current) => current.filter((element) => element.id !== id))
  }

  const updateState = (index: number) => (e: any) => {
    const newArray = fieldGroups.map((item, i) => {
      return index === i ? { ...item, inputField: e } : item
    })
    setFieldGroups(newArray)
  }

  return (
    <div className={containerStyle}>
      {fieldGroups.map((element, index) => {
        return (
          <div key={index} className="flex w-full flex-row items-start p-0 gap-4 h-full">
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
                resetIcon={InputResetIcon}
                errorMessage={InputErrorMessage}
                disabled={InputDisabled}
                value={element.inputField}
                onChange={updateState(index)}
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
              value={element.selectField}
              onChange={SelectOnChange}
              className="w-[400px]"
            />
            {fieldGroups.length > 1 ? (
              <div
                className="flex w-6 h-6 justify-center items-center cursor-pointer mt-auto mb-5 rotate-45"
                onClick={() => removeField(element.id)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                    fill="red"
                  />
                </svg>
              </div>
            ) : (
              // 0 IQ solution, I will fix it during other fixes
              <div className="w-6 h-6" />
            )}
          </div>
        )
      })}
      <div className="py-0 pr-0 pl-8">
        <div
          className="flex flex-row justify-center select-none items-center px-0 py-2 gap-2 cursor-pointer"
          onClick={() => addField()}
        >
          <div className="flex w-6 h-6 justify-center items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="text-xl font-semibold leading-6 not-italic">{addNew}</div>
        </div>
      </div>
    </div>
  )
}
