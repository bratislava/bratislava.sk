// export default interface SelectOption {
//   value: string
//   label: string
//   description?: string
// }


import { EnumOptionsType } from '@rjsf/utils'

type SelectRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  type?: 'one' | 'multiple' | 'arrow' | 'radio'
  description?: string
}

export default SelectRJSFOptions
