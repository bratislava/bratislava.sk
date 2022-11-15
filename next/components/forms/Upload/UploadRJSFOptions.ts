import { EnumOptionsType } from '@rjsf/utils'

type UploadRJSFOptions = {
   enumOptions?: EnumOptionsType[]
   sizeLimit?: number
   supportedFormats?: string[]
   type?: 'button' | 'dragAndDrop'
}

export default UploadRJSFOptions
