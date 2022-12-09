import { EnumOptionsType } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'

interface UploadRJSFOptions extends WidgetOptions {
  enumOptions?: EnumOptionsType[]
  size?: number
  accept?: string
  type?: 'button' | 'dragAndDrop'
}

export default UploadRJSFOptions
