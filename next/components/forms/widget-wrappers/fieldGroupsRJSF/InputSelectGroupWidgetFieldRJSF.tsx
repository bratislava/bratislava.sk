import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React, { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputSelectGroup } from '../../groups'

const InputSelectGroupWidgetFieldRJSF = (props: FieldProps) => {
  const { formData, onChange, schema } = props
  const [keys] = useState(
    Object.keys(
      {
        ...(schema.items as Record<string, string>),
      }?.properties,
    ),
  )
  const [fieldGroups, setFieldGroups] = useState<Array<object>>([])
  const type =
    {
      ...({
        ...({
          ...(schema.items as Record<string, string>),
        }?.properties as unknown as Record<string, string>),
      }[keys[1]] as unknown as Record<string, string>),
    }.type === 'array'
      ? 'multiple'
      : 'one'
  const enumOptions = {
    ...({
      ...({
        ...(schema.items as Record<string, string>),
      }?.properties as unknown as Record<string, string>),
    }[keys[1]] as unknown as Record<string, Array<any>>),
  }.oneOf

  useEffectOnce(() => {
    if (!formData) {
      setFieldGroups(
        fieldGroups.concat({
          [keys[0]]: '',
          [keys[1]]: type === 'multiple' ? [] : '',
          id: uuidv4(),
        }),
      )
      setFieldGroups((prev: any) => {
        // to avoid render warning
        setTimeout(() => {
          onChange(prev)
        }, 0)
        return prev
      })
    } else {
      setFieldGroups(transformValue())
    }
  })
  const handleTransformOne = () => {
    const value: Array<any> = [...formData]
    return value.map((el) => {
      const result = []
      const a: any[] = []
      enumOptions.map((enums) => {
        if (enums.value === el[keys[1]]) {
          a.push(enums)
        }
      })
      result.push({ mainObj: el, enumValues: a[0] })
      return result
    })
  }

  const handleTransformMultiple = () => {
    if (Array.isArray(formData)) {
      const value: Array<any> = [...formData]
      return value.map((el) => {
        const result = []
        const a: any[] = []
        enumOptions.map((enums) => {
          if (el[keys[1]].includes(enums.value)) {
            a.push(enums)
          }
        })
        result.push({ mainObj: el, enumValues: a })
        return result
      })
    }
    return []
  }

  const transformValue = () => {
    return type === 'multiple' ? getTransformMultipleData() : getTransformSingleData()
  }

  const getTransformMultipleData = () => {
    const testData = handleTransformMultiple()
    const toRet: never[] = []
    if (Array.isArray(testData)) {
      const obj = JSON.parse(JSON.stringify(testData))
      const kek = obj.map((obj1: Array<object>) => {
        return obj1.map((objMap: any) => {
          objMap.mainObj[keys[1]] = objMap.enumValues
          return { ...objMap.mainObj }
        })
      })
      const toRet: never[] = []
      kek.forEach((el: never) => {
        toRet.push(el[0])
      })
      return toRet
    }
    return toRet
  }

  const getTransformSingleData = () => {
    const testData = handleTransformOne()
    const obj = JSON.parse(JSON.stringify(testData))
    const kek = obj.map((obj1: Array<object>) => {
      return obj1.map((objMap: any) => {
        objMap.mainObj[keys[1]] = objMap.enumValues ? [objMap.enumValues] : ''
        return objMap.mainObj
      })
    })
    const toRet: any[] = []
    kek.forEach((el: any) => {
      toRet.push(el[0])
    })
    return toRet
  }
  return (
    <div>
      {fieldGroups.length > 0 && Array.isArray(formData) && formData.length > 0 && (
        <InputSelectGroup
          SelectLabel="Interval odvozu"
          SelectOnChange={() => {}}
          InputLabel="Počet"
          InputTooltip="Some Tooltip"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
          SelectClassName="sm:w-[400px]"
          SelectType={type}
          addNew="Pridať ďalší riadok"
          groupValues={fieldGroups}
          formDataArray={formData ?? []}
          saveFormData={onChange}
          propKeys={keys}
        />
      )}
    </div>
  )
}

export default InputSelectGroupWidgetFieldRJSF
