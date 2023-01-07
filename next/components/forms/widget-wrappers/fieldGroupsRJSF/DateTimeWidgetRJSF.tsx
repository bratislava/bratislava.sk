import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'

import { DateTimePicker } from '../../groups'

const uiOptions = 'ui:options'
const DateTimeWidgetRJSF = (props: FieldProps) => {
  const { formData, onChange, schema, uiSchema, rawErrors = [] } = props
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

  const requiredField = (propKey: string) => {
    return schema.required?.includes(propKey)
  }

  const getErrorMessage = (propKey: string): string[] => {
    const errors: string[] = []
    if (Array.isArray(rawErrors)) {
      rawErrors.forEach((rawError: string) => {
        if (rawError.includes(propKey)) {
          errors.push(rawError)
        }
      })
    }
    return errors
  }

  return (
    <div className={getUIProp('className')}>
      <DateTimePicker
        DateTooltip={getUIProp('DateTooltip')}
        TimeTooltip={getUIProp('TimeTooltip')}
        DateDescription={getUIProp('DateDescription')}
        TimeDescription={getUIProp('TimeDescription')}
        DateRequired={requiredField(keys[0])}
        TimeRequired={requiredField(keys[1])}
        DateErrorMessage={getErrorMessage(keys[0])}
        TimeErrorMessage={getErrorMessage(keys[1])}
        DateOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        TimeOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        DateValue={{ ...(state as Record<string, string>) }[keys[0]] as keyof object}
        TimeValue={{ ...(state as Record<string, string>) }[keys[1]] as keyof object}
        TimeLabel={getUIProp('TimeLabel')}
        DateLabel={getUIProp('DateLabel')}
      />
    </div>
  )
}

export default DateTimeWidgetRJSF
