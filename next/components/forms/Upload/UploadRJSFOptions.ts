import { EnumOptionsType } from '@rjsf/utils'

type UploadRJSFOptions = {
   enumOptions?: EnumOptionsType[]
   size?: number
   accept?: string
   type?: 'button' | 'dragAndDrop'
}

export default UploadRJSFOptions
