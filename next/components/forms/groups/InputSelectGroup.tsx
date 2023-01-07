import PlusCircleIcon from '@assets/images/forms/circle-plus-icon.svg'
import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import InputField from '../widget-components/InputField/InputField'
import SelectField from '../widget-components/SelectField/SelectField'

type InputBase = {
  InputLabel: string
  InputPlaceholder?: string
  InputErrorMessage?: string[]
  InputDescription?: string
  InputClassName?: string
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
  SelectErrorMessage?: string[]
  SelectDescription?: string
  SelectRequired?: boolean
  SelectExplicitOptional?: boolean
  SelectDisabled?: boolean
  SelectClassName?: string
}

type mainObjectType = {
  id: string
  [key: string]: string | string[] | EnumOptionsType[] | EnumOptionsType[][]
}

export const InputSelectGroup = ({
  groupValues = [],
  saveFormData,
  propKeys,
  formDataArray,
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
    groupValues?: mainObjectType[]
    saveFormData: (obj: mainObjectType[]) => void
    formDataArray?: mainObjectType[]
    propKeys: string[]
  }) => {
  const [fieldGroups, setFieldGroups] = useState<mainObjectType[]>([...groupValues])
  const [formData, setFormData] = useState<mainObjectType[]>([...(formDataArray ?? [])])
  const containerStyle = cx('flex flex-col items-start gap-4', {})

  const addField = () => {
    setFieldGroups(
      fieldGroups.concat({
        [propKeys[0]]: '',
        [propKeys[1]]: SelectType === 'multiple' ? [] : '',
        id: uuidv4(),
      }),
    )
    setFormData(
      formData.concat({
        [propKeys[0]]: '',
        [propKeys[1]]: SelectType === 'multiple' ? [] : '',
        id: uuidv4(),
      }),
    )
    setFormData((prev: mainObjectType[]) => {
      setFormData([...prev])
      return prev
    })
  }

  const removeField = (id: string) => {
    setFieldGroups((current: mainObjectType[]) => current.filter((element) => element.id !== id))
    setFormData((current: mainObjectType[]) => current.filter((element) => element.id !== id))
  }

  const handleOnChangeMultiple = (newValue: EnumOptionsType[]) => {
    return newValue.map((option: EnumOptionsType) => option.value)
  }

  const handleOnChangeOne = (newValue: EnumOptionsType[]) => {
    if (newValue[0]) {
      return newValue[0].value
    }
    return null
  }

  const updateState =
    (index: number, propIndex: 0 | 1) => (e: string | undefined | EnumOptionsType[]) => {
      if (e !== undefined) {
        let newValue = e
        if (Array.isArray(e)) {
          newValue = SelectType === 'multiple' ? handleOnChangeMultiple(e) : handleOnChangeOne(e)
        }
        const newArrayFormData = formData.map((item, i) => {
          return index === i ? { ...item, [propKeys[propIndex]]: newValue } : item
        })
        setFormData(newArrayFormData)
        const newArray = fieldGroups.map((item, i) => {
          return index === i ? { ...item, [propKeys[propIndex]]: e } : item
        })
        setFieldGroups(newArray)
      }
    }

  useEffect(() => {
    setFormData((prev: mainObjectType[]) => {
      // to avoid render warning
      setTimeout(() => {
        saveFormData([...prev])
      }, 0)
      return prev
    })
  }, [fieldGroups, saveFormData])

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
                value={element[propKeys[0]] as string}
                onChange={updateState(index, 0)}
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
              onChange={updateState(index, 1)}
              className={SelectClassName}
            />
            {fieldGroups.length > 1 ? (
              <button
                type="button"
                className="flex w-6 h-6 justify-center items-center cursor-pointer mt-auto mb-5 rotate-45"
                onClick={() => removeField(element.id)}
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
          onClick={() => addField()}
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
