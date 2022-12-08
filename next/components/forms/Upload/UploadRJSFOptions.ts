import { EnumOptionsType } from '@rjsf/utils'
import { FormSpacingType } from '@utils/formsHelper'

type UploadRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  size?: number
  accept?: string
  type?: 'button' | 'dragAndDrop'
  className?: string
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}

export default UploadRJSFOptions
