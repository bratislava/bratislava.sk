import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'

import { DateFromTo } from '../../groups'

const uiOptions = 'ui:options'
const DateFromToWidgetRJSF = (props: FieldProps) => {
  const { formData, onChange, schema, uiSchema } = props
  const [state, setState] = useState({ ...formData })
  const [keys] = useState(Object.keys({ ...schema.properties }))

  const handleOnChange = (valueName: string, newValue?: string | undefined) => {
    setState({
      [valueName]: newValue,
    })
    setState((prevState: object) => {
      return { ...state, ...prevState } as object
    })
  }

  useEffect(() => {
    onChange(state)
  }, [state])

  const getUIProp = (uiPropName: string) => {
    return {
      ...(uiSchema && (uiSchema[uiOptions] as Record<string, string>)),
    }[uiPropName]
  }

  return (
    <div className={getUIProp('className')}>
      <DateFromTo
        DateToTooltip={getUIProp('DateToTooltip')}
        DateFromTooltip={getUIProp('DateFromTooltip')}
        DateFromDescription={getUIProp('DateFromDescription')}
        DateToDescription={getUIProp('DateToDescription')}
        DateFromOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        DateToOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        DateFromValue={{ ...(state as Record<string, string>) }[keys[0]] as keyof object}
        DateToValue={{ ...(state as Record<string, string>) }[keys[1]] as keyof object}
        DateFromLabel={getUIProp('DateFromLabel')}
        DateToLabel={getUIProp('DateToLabel')}
      />
    </div>
  )
}

export default DateFromToWidgetRJSF
