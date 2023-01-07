import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'

import { TimeFromTo } from '../../groups'

const uiOptions = 'ui:options'
const TimeFromToWidgetRJSF = (props: FieldProps) => {
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
  }, [onChange, state])

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
      <TimeFromTo
        TimeToTooltip={getUIProp('TimeToTooltip')}
        TimeFromTooltip={getUIProp('TimeFromTooltip')}
        TimeFromDescription={getUIProp('TimeFromDescription')}
        TimeToDescription={getUIProp('TimeToDescription')}
        TimeFromRequired={requiredField(keys[0])}
        TimeToRequired={requiredField(keys[1])}
        TimeFromErrorMessage={getErrorMessage(keys[0])}
        TimeToErrorMessage={getErrorMessage(keys[1])}
        TimeFromExplicitOptional={getUIProp('TimeFromExplicitOptional') as unknown as boolean}
        TimeToExplicitOptional={getUIProp('TimeToExplicitOptional') as unknown as boolean}
        TimeFromOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        TimeToOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        TimeFromValue={{ ...(state as Record<string, string>) }[keys[0]] as keyof object}
        TimeToValue={{ ...(state as Record<string, string>) }[keys[1]] as keyof object}
        TimeFromLabel={getUIProp('TimeFromLabel')}
        TimeToLabel={getUIProp('TimeToLabel')}
      />
    </div>
  )
}

export default TimeFromToWidgetRJSF
