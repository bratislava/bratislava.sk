import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { FieldProps } from '@rjsf/utils'
import React, { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { InputUploadGroup } from '../../groups'
import { isLeftIconVariant, LeftIconVariants } from '../../widget-components/InputField/InputField'
import { fileNameToMinioFile } from '../UploadWidgetRJSF'

const InputUploadGroupWidgetRJSF = ({
  formData,
  onChange,
  schema,
  uiSchema,
  rawErrors = [],
}: FieldProps) => {
  const keys = Object.keys({ ...schema.properties })
  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])
  const uiSchemaOptionsObject = {
    ...(uiSchema && (uiSchema['ui:options'] as Record<string, string | number | boolean>)),
  }
  const schemaProperties = {
    ...(schema.properties as Record<string, { type: string; title: string }>),
  }
  const multiple = schemaProperties[keys[1]]?.type === 'array'

  const handleOnChange = (valueName: string, newValue?: string | string[]) => {
    onChange({
      ...formData,
      [valueName]: newValue,
    })
  }

  const getLabel = (propName: string) => {
    return schemaProperties[propName].title
  }

  useEffectOnce(() => {
    const statePropKey: string = keys[1]
    // I need to save multiple pieces of info about the file - this isn't stored in rjsf, but needed DURING upload
    // I am saving this info only in innerValue of widget
    // but when I go to previous step of the stepper, component is rebuilt and I still need at least the fileName, so I read fileNames from rjsf state and transform them
    const valueArray: string[] =
      multiple && Array.isArray(formData[statePropKey])
        ? [...formData[statePropKey]]
        : formData[statePropKey] && !Array.isArray(formData[statePropKey])
        ? [formData[statePropKey]]
        : []
    const initialInnerValue: UploadMinioFile[] = valueArray.map(fileNameToMinioFile)
    setInnerValue(initialInnerValue)
  })

  const handleOneFile = (files: UploadMinioFile[]) => {
    if (!files[0]?.isUploading && !files[0]?.errorMessage) {
      handleOnChange(keys[1], files[0]?.file.name)
    } else {
      handleOnChange(keys[1], '')
    }
  }

  const handleMultipleFiles = (files: UploadMinioFile[]) => {
    const chosenFileNames: string[] = []
    files.forEach((minioFile) => {
      if (!minioFile.isUploading && !minioFile.errorMessage) {
        chosenFileNames.push(minioFile.file.name)
      }
    })
    handleOnChange(keys[1], chosenFileNames)
  }

  const handleFileOnChange = (files: UploadMinioFile[]) => {
    setInnerValue(files)
    if (multiple) {
      handleMultipleFiles(files)
    } else {
      handleOneFile(files)
    }
  }

  const inputType = (inputTypeName: string) => {
    const type = uiSchemaOptionsObject[inputTypeName]
    if (type !== 'text' && type !== 'password') {
      return 'text'
    }
    return type
  }

  const getUIProp = (uiPropName: string) => {
    return uiSchemaOptionsObject[uiPropName]
  }

  const getLeftIcon = (iconInput: 'InputLeftIcon'): LeftIconVariants | undefined => {
    const iconVariant = uiSchemaOptionsObject[iconInput]
    return typeof iconVariant === 'string' && isLeftIconVariant(iconVariant)
      ? iconVariant
      : undefined
  }

  const getUploadType = (uploadType: string): 'button' | 'dragAndDrop' => {
    const uploadTypeVariant = uiSchemaOptionsObject[uploadType]
    if (uploadTypeVariant !== 'button' && uploadTypeVariant !== 'dragAndDrop') {
      return 'button'
    }
    return uploadTypeVariant
  }

  const supportedFormats = (getUIProp('UploadSupportedFormats') as string)
    ?.split(',')
    .filter((element: string | any[]) => element.length > 0)

  const requiredField = (propKey: string) => {
    return schema.required?.includes(propKey)
  }

  // TODO fix this code block. Re check what kind of error message it returns and fix in a new way according new task
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
    <div className={getUIProp('className') as string}>
      <InputUploadGroup
        InputLabel={getLabel(keys[0])}
        UploadLabel={getLabel(keys[1])}
        InputValue={(formData as { [key: string]: unknown })[keys[0]] as string}
        InputOnChange={(e) => handleOnChange(keys[0], e)}
        InputPlaceholder={getUIProp('InputPlaceholder') as string}
        InputType={inputType('InputType')}
        InputDescription={getUIProp('InputDescription') as string}
        InputRequired={requiredField(keys[0])}
        InputErrorMessage={getErrorMessage(keys[0])}
        UploadErrorMessage={getErrorMessage(keys[1])}
        InputTooltip={getUIProp('InputTooltip') as string}
        InputExplicitOptional={getUIProp('InputExplicitOptional') as unknown as boolean}
        InputLeftIcon={getLeftIcon('InputLeftIcon')}
        InputResetIcon={getUIProp('InputResetIcon') as unknown as boolean}
        InputClassName={getUIProp('InputClassName') as string}
        UploadType={getUploadType('UploadType')}
        middleText={getUIProp('middleText') as string}
        UploadValue={innerValue}
        UploadMultiple={multiple}
        UploadOnChange={handleFileOnChange}
        UploadRequired={requiredField(keys[0])}
        UploadSupportedFormats={supportedFormats}
        UploadSizeLimit={Number(getUIProp('UploadSizeLimit'))}
        UploadClassName={getUIProp('UploadClassName') as string}
      />
    </div>
  )
}
export default InputUploadGroupWidgetRJSF
