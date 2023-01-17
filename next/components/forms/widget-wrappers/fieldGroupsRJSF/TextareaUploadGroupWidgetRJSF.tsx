import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { FieldProps } from '@rjsf/utils'
import React, { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { TextareaUploadGroup } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import { UploadType } from '../../widget-components/Upload/Upload'
import { fileNameToMinioFile } from '../UploadWidgetRJSF'

const TextareaUploadGroupWidgetRJSF = ({
  formData,
  onChange,
  schema,
  uiSchema,
  rawErrors = [],
}: FieldProps) => {
  const schemaProperties = {
    ...(schema.properties as Record<string, { type: string; title: string }>),
  }

  const keys = Object.keys({ ...schema.properties })
  const multiple = schemaProperties[keys[1]]?.type === 'array'
  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])
  const localUiSchema = uiSchema?.['ui:options']

  const handleOnChange = (valueName: string, newValue?: string | string[]) => {
    onChange({
      ...formData,
      [valueName]: newValue,
    })
  }

  const getLabel = (propName: string) => schemaProperties[propName].title

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

  const getUploadType = (uploadType: string): UploadType =>
    localUiSchema?.[uploadType] === 'dragAndDrop' ? 'dragAndDrop' : 'button'

  const supportedFormats = (localUiSchema?.UploadSupportedFormats as string)?.split(',')

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
    <div className={localUiSchema?.className as string}>
      <TextareaUploadGroup
        TextareaLabel={getLabel(keys[0])}
        UploadLabel={getLabel(keys[1])}
        TextareaValue={formData[keys[0]]}
        TextareaOnChange={(e) => handleOnChange(keys[0], e)}
        TextareaPlaceholder={localUiSchema?.TextareaPlaceholder as string}
        TextareaDescription={localUiSchema?.TextareaDescription as string}
        TextareaRequired={schema.required?.includes(keys[0])}
        TextareaTooltip={localUiSchema?.TextareaTooltip as string}
        TextareaExplicitOptional={localUiSchema?.TextareaExplicitOptional as ExplicitOptionalType}
        TextareaClassName={localUiSchema?.TextareaClassName as string}
        TextareaErrorMessage={getErrorMessage(keys[0])}
        UploadType={getUploadType('UploadType')}
        middleText={localUiSchema?.middleText as string}
        UploadValue={innerValue}
        UploadMultiple={multiple}
        UploadOnChange={handleFileOnChange}
        UploadRequired={schema.required?.includes(keys[1])}
        UploadSupportedFormats={supportedFormats}
        UploadSizeLimit={Number(localUiSchema?.UploadSizeLimit)}
        UploadErrorMessage={getErrorMessage(keys[1])}
        UploadClassName={localUiSchema?.UploadClassName as string}
      />
    </div>
  )
}

export default TextareaUploadGroupWidgetRJSF
