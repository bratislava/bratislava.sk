import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { TextareaUploadGroup } from '../../groups'

const TextareaUploadGroupWidgetRJSF = (props: FieldProps) => {
  const { formData, onChange, schema } = props

  const [state, setState] = useState({ ...formData })
  const [keys] = useState(Object.keys({ ...schema.properties }))
  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])
  const multiple = ({ ...schema.properties }[keys[1]] as Record<string, string>)?.type === 'array'

  const handleOnChange = (valueName: string, newValue?: string | string[]) => {
    console.log()
    setState({
      [valueName]: newValue,
    })
    setState((prevState: object) => {
      return { ...state, ...prevState } as object
    })
  }

  useEffect(() => {
    onChange(state)
  }, [state])

  const getLabel = (propName: string) => {
    return {
      ...(schema.properties && (schema.properties[propName] as Record<string, string>)),
    }.title
  }

  const fileNameToMinioFile = (fileName: string): UploadMinioFile => {
    const fileNameArray = fileName.split('_')
    fileNameArray.splice(0, 2)
    const originalName = fileNameArray.join('_')
    return {
      file: new File([], fileName),
      isUploading: false,
      originalName,
    }
  }

  useEffectOnce(() => {
    const statePropKey: string = keys[1]
    // I need to save multiple pieces of info about the file - this isn't stored in rjsf, but needed DURING upload
    // I am saving this info only in innerValue of widget
    // but when I go to previous step of the stepper, component is rebuilt and I still need at least the fileName, so I read fileNames from rjsf state and transform them
    const valueArray: string[] =
      multiple && Array.isArray(state[statePropKey])
        ? [...state[statePropKey]]
        : state[statePropKey] && !Array.isArray(state[statePropKey])
        ? [state[statePropKey]]
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

  const getUIProp = (uiPropName: string) => {
    return {
      ...(props.uiSchema && (props.uiSchema['ui:options'] as Record<string, string>)),
    }[uiPropName]
  }

  const getUploadType = (uploadType: string): 'button' | 'dragAndDrop' => {
    const uploadTypeVariant = {
      ...(props.uiSchema && (props.uiSchema['ui:options'] as Record<string, string>)),
    }[uploadType]
    if (uploadTypeVariant !== 'button' && uploadTypeVariant !== 'dragAndDrop') {
      return 'button'
    }
    return uploadTypeVariant
  }

  const supportedFormats = getUIProp('UploadSupportedFormats')?.split(',')
  return (
    <div className={getUIProp('className')}>
      <TextareaUploadGroup
        TextareaLabel={getLabel(keys[0])}
        UploadLabel={getLabel(keys[1])}
        TextareaValue={{ ...(state as Record<string, string>) }[keys[0]] as keyof object}
        TextareaOnChange={(e) => handleOnChange(keys[0], e)}
        TextareaPlaceholder={getUIProp('TextareaPlaceholder')}
        TextareaDescription={getUIProp('TextareaDescription')}
        TextareaRequired={getUIProp('TextareaRequired') as unknown as boolean}
        TextareaTooltip={getUIProp('TextareaTooltip')}
        TextareaExplicitOptional={getUIProp('TextareaExplicitOptional') as unknown as boolean}
        TextareaClassName={getUIProp('TextareaClassName')}
        UploadType={getUploadType('UploadType')}
        middleText={getUIProp('middleText')}
        UploadValue={innerValue}
        UploadMultiple={multiple}
        UploadOnChange={handleFileOnChange}
        UploadRequired={getUIProp('UploadRequired') as unknown as boolean}
        UploadSupportedFormats={supportedFormats}
        UploadSizeLimit={Number(getUIProp('UploadSizeLimit'))}
        UploadClassName={getUIProp('UploadClassName')}
      />
    </div>
  )
}
export default TextareaUploadGroupWidgetRJSF
