import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'
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

  const enumOptions = {
    ...({
      ...({
        ...(schema.items as Record<string, string>),
      }?.properties as unknown as Record<string, string>),
    }[keys[1]] as unknown as Record<string, string>),
  }.oneOf

  const [fieldGroups, setFieldGroups] = useState<Array<object>>([])
  useEffectOnce(() => {
    if (!formData) {
      setFieldGroups(fieldGroups.concat({ [keys[0]]: '', [keys[1]]: [], id: uuidv4() }))
      setFieldGroups((prev: any) => {
        // to avoid render warning
        setTimeout(() => {
          onChange(prev)
        }, 0)
        return prev
      })
    } else {
      setFieldGroups([...formData])
    }
  })

  return (
    <div>
      {fieldGroups.length > 0 && (
        <InputSelectGroup
          SelectLabel="Interval odvozu"
          SelectOnChange={() => {}}
          InputLabel="Počet"
          InputTooltip="Some Tooltip"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
          SelectClassName="sm:w-[400px]"
          addNew="Pridať ďalší riadok"
          groupValues={fieldGroups}
          saveFormData={onChange}
          propKeys={keys}
        />
      )}
    </div>
  )
}

export default InputSelectGroupWidgetFieldRJSF
