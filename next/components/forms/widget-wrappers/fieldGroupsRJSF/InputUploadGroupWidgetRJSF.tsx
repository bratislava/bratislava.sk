import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { InputUploadGroup } from '../../groups'
import { LeftIconVariants } from '../../widget-components/InputField/InputField'

const InputUploadGroupWidgetRJSF = (props: FieldProps) => {
  const { formData, onChange, schema } = props
  // console.log(props)
  const [state, setState] = useState({ ...formData })
  const [keys] = useState(Object.keys({ ...schema.properties }))
  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])
  const multiple = ({ ...schema.properties }[keys[1]] as Record<string, string>)?.type === 'array'

  const handleOnChange = (valueName: string, newValue?: string | string[]) => {
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

  const inputType = (inputType: string) => {
    const type = {
      ...(props.uiSchema && (props.uiSchema['ui:options'] as Record<string, string>)),
    }[inputType]
    if (type !== 'text' && type !== 'password') {
      return 'text'
    }
    return type
  }

  const getUIProp = (uiPropName: string) => {
    return {
      ...(props.uiSchema && (props.uiSchema['ui:options'] as Record<string, string>)),
    }[uiPropName]
  }

  const isLeftIconVariant = (val: string): val is LeftIconVariants => {
    const list: LeftIconVariants[] = ['person', 'mail', 'call', 'lock']
    return list.includes(val as LeftIconVariants)
  }

  const getLeftIcon = (iconInput: 'InputLeftIcon'): LeftIconVariants | undefined => {
    const iconVariant = {
      ...(props.uiSchema && (props.uiSchema['ui:options'] as Record<string, string>)),
    }[iconInput]
    return isLeftIconVariant(iconVariant) ? iconVariant : undefined
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
      <InputUploadGroup
        InputLabel={getLabel(keys[0])}
        UploadLabel={getLabel(keys[1])}
        InputValue={{ ...(state as Record<string, string>) }[keys[0]] as keyof object}
        InputOnChange={(e) => handleOnChange(keys[0], e)}
        InputPlaceholder={getUIProp('InputPlaceholder')}
        InputType={inputType('InputType')}
        InputDescription={getUIProp('InputDescription')}
        InputRequired={getUIProp('InputRequired') as unknown as boolean}
        InputTooltip={getUIProp('InputTooltip')}
        InputExplicitOptional={getUIProp('InputExplicitOptional') as unknown as boolean}
        InputLeftIcon={getLeftIcon('InputLeftIcon')}
        InputResetIcon={getUIProp('InputResetIcon') as unknown as boolean}
        InputClassName={getUIProp('InputClassName')}
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
export default InputUploadGroupWidgetRJSF
