import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DoubledInputField } from '../../groups'
import { LeftIconVariants } from '../../widget-components/InputField/InputField'

const uiOptions = 'ui:options'
class DoubledInputWidgetFieldRJSF extends React.Component<FieldProps> {
  constructor(props: FieldProps) {
    super(props)
    this.state = { ...props.formData }
  }

  handleOnChange(name: string, event?: string) {
    this.setState(
      {
        [name]: event,
      },
      ({ props: { onChange } } = this) => onChange(this.state),
    )
  }

  getLabel = (index: 0 | 1) => {
    const { props, state } = this
    return {
      ...(props.schema.properties &&
        (props.schema.properties[Object.keys(state)[index]] as Record<string, string>)),
    }.title
  }

  inputType = (inputType: 'FirstInputType' | 'SecondInputType') => {
    const { props } = this
    const type = {
      ...(props.uiSchema && (props.uiSchema[uiOptions] as Record<string, string>)),
    }[inputType]
    if (type !== 'text' && type !== 'password') {
      return 'text'
    }
    return type
  }

  isLeftIconVariant = (val: string): val is LeftIconVariants => {
    const list: LeftIconVariants[] = ['person', 'mail', 'call', 'lock']
    return list.includes(val as LeftIconVariants)
  }

  getLeftIcon = (
    iconInput: 'FirstInputLeftIcon' | 'SecondInputLeftIcon',
  ): LeftIconVariants | undefined => {
    const { props } = this
    const iconVariant = {
      ...(props.uiSchema && (props.uiSchema[uiOptions] as Record<string, string>)),
    }[iconInput]
    return this.isLeftIconVariant(iconVariant) ? iconVariant : undefined
  }

  getUIProp = (uiPropName: string) => {
    const { props } = this
    return {
      ...(props.uiSchema && (props.uiSchema[uiOptions] as Record<string, string>)),
    }[uiPropName]
  }

  requiredField = (propKey: string) => {
    const {
      props: { schema },
    } = this
    return schema.required?.includes(propKey)
  }

  getErrorMessage = (propKey: string): string[] => {
    const {
      props: { rawErrors },
    } = this
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

  render() {
    const { state } = this
    return (
      <div className={this.getUIProp('className')}>
        <DoubledInputField
          FirstInputLabel={this.getLabel(0)}
          SecondInputLabel={this.getLabel(1)}
          FirstInputValue={state[Object.keys(state)[0] as keyof object]}
          SecondInputValue={state[Object.keys(state)[1] as keyof object]}
          FirstInputHandler={(e) => this.handleOnChange(Object.keys(state)[0], e)}
          SecondInputHandler={(e) => this.handleOnChange(Object.keys(state)[1], e)}
          FirstInputPlaceholder={this.getUIProp('FirstInputPlaceholder')}
          SecondInputPlaceholder={this.getUIProp('SecondInputPlaceholder')}
          FirstInputTooltip={this.getUIProp('FirstInputTooltip')}
          SecondInputTooltip={this.getUIProp('SecondInputTooltip')}
          FirstInputDescription={this.getUIProp('FirstInputDescription')}
          SecondInputDescription={this.getUIProp('SecondInputDescription')}
          FirstInputType={this.inputType('FirstInputType')}
          SecondInputType={this.inputType('SecondInputType')}
          FirstInputRequired={this.requiredField(Object.keys(state)[0])}
          SecondInputRequired={this.requiredField(Object.keys(state)[1])}
          FirstInputLeftIcon={this.getLeftIcon('FirstInputLeftIcon')}
          SecondInputLeftIcon={this.getLeftIcon('SecondInputLeftIcon')}
          FirstInputExplicitOptional={
            this.getUIProp('FirstInputExplicitOptional') as unknown as boolean
          }
          SecondInputExplicitOptional={
            this.getUIProp('SecondInputExplicitOptional') as unknown as boolean
          }
          FirstInputResetIcon={this.getUIProp('FirstInputResetIcon') as unknown as boolean}
          SecondInputResetIcon={this.getUIProp('SecondInputResetIcon') as unknown as boolean}
          FirstInputClassNames={this.getUIProp('FirstInputClassNames')}
          SecondInputClassNames={this.getUIProp('SecondInputClassNames')}
          FirstInputErrorMessage={this.getErrorMessage(Object.keys(state)[0])}
          SecondInputErrorMessage={this.getErrorMessage(Object.keys(state)[1])}
        />
      </div>
    )
  }
}
export default DoubledInputWidgetFieldRJSF
