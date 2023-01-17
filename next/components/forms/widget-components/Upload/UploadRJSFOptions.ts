import { EnumOptionsType } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'

type UploadRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  size?: number
  accept?: string
  type?: 'button' | 'dragAndDrop'
  uDescription?: string | string[]
} & WidgetOptions

export default UploadRJSFOptions
