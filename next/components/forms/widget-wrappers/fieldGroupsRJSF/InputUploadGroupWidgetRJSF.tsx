import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import { FieldProps } from '@rjsf/utils'
import React, { useEffect, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { InputUploadGroup } from '../../groups'

const InputUploadGroupWidgetRJSF = (props: FieldProps) => {
  const { formData, onChange, schema } = props
  // console.log(props)
  const [state, setState] = useState({ ...formData })
  const [innerValue, setInnerValue] = useState<UploadMinioFile[]>([])
  const a = { ...schema.properties }
  const multiple =
    (a[Object.keys({ ...schema.properties })[1]] as Record<string, string>).type === 'array'

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
    const statePropKey: string = Object.keys({ ...schema.properties })[1]
    // console.log(state[a])

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
      handleOnChange(Object.keys({ ...schema.properties })[1], files[0]?.file.name)
    } else {
      handleOnChange(Object.keys({ ...schema.properties })[1], '')
    }
  }

  const handleMultipleFiles = (files: UploadMinioFile[]) => {
    const chosenFileNames: string[] = []
    files.forEach((minioFile) => {
      if (!minioFile.isUploading && !minioFile.errorMessage) {
        chosenFileNames.push(minioFile.file.name)
      }
    })
    handleOnChange(Object.keys({ ...schema.properties })[1], chosenFileNames)
  }

  const handleFileOnChange = (files: UploadMinioFile[]) => {
    setInnerValue(files)
    if (multiple) {
      handleMultipleFiles(files)
    } else {
      handleOneFile(files)
    }
  }

  return (
    <div className="sm:w-[500px]">
      <InputUploadGroup
        InputLabel={getLabel(Object.keys({ ...schema.properties })[0])}
        UploadLabel={getLabel(Object.keys({ ...schema.properties })[1])}
        InputValue={
          { ...(state as Record<string, string>) }[
            Object.keys({ ...schema.properties })[0]
          ] as keyof object
        }
        InputOnChange={(e) => handleOnChange(Object.keys({ ...schema.properties })[0], e)}
        InputPlaceholder="place"
        UploadType="button"
        middleText="alebo"
        UploadValue={innerValue}
        UploadMultiple={multiple}
        UploadOnChange={handleFileOnChange}
      />
    </div>
  )
}
export default InputUploadGroupWidgetRJSF
