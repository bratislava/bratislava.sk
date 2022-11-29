import { UploadMinioFile } from '@backend/dtos/minio/upload-minio-file.dto'
import cx from 'classnames'
import React, { useState } from 'react'

import DatePicker from './DateTimePicker/DatePicker'
import TimePicker from './DateTimePicker/TimePicker'
import InputField from './InputField'
import SelectField from './SelectField/SelectField'
import TextAreaField from './TextAreaField'
import Upload from './Upload/Upload'

type FieldGroupsBase = {
  className?: string
}

export const InputSelectGroup = ({ className }: FieldGroupsBase) => {
  const [fieldGroups, setFieldGroups] = useState([{ inputField: '', selectField: [] }])
  const containerStyle = cx('flex flex-col items-start p-0 gap-4', className, {})
  const addField = () => {
    setFieldGroups([...fieldGroups, { inputField: '', selectField: [] }])
  }
  const removeField = (index: number) => {
    fieldGroups.splice(index, 1)
  }
  return (
    <div className={containerStyle}>
      {fieldGroups.map((element, index) => {
        return (
          <div key={index} className="flex flex-row items-start p-0 gap-4 h-full">
            <div className="flex relative flex-col items-start pt-3 w-3 ">
              <div className="bg-gray-200 w-0.5 h-[50px]" />
              <div className="w-3 h-0.5 bg-gray-200" />
            </div>
            <InputField label="Počet" value={element.inputField} placeholder="" />
            <SelectField
              label="Interval odvozu"
              type="one"
              value={element.selectField}
              onChange={(value) => console.log(value)}
              className="w-full"
            />
          </div>
        )
      })}
      <div className="py-0 pr-0 pl-8">
        <div
          className="flex flex-row justify-center select-none items-center px-0 py-2 gap-2 cursor-pointer"
          onClick={() => {
            addField()
          }}
        >
          <div className="flex w-6 h-6 justify-center items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="text-xl font-semibold leading-6 not-italic">Pridať ďalší riadok</div>
        </div>
      </div>
    </div>
  )
}

export const DateGroup = ({ className }: FieldGroupsBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4', className)}>
      <div className="flex flex-row items-center p-0 gap-6">
        <div className="flex flex-col items-start p-0 gap-1">
          <div className="text-p-md font-semibold leading-8 not-italic">Dátum (od – do)</div>
          <DatePicker required />
        </div>
        <div className="w-8 h-0.5 bg-gray-300 mt-10" />
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <DatePicker required />
        </div>
      </div>
    </div>
  )
}

export const TimeGroup = ({ className }: FieldGroupsBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4', className)}>
      <div className="flex flex-row items-center p-0 gap-6">
        <div className="flex flex-col items-start p-0 gap-1">
          <div className="text-p-md font-semibold leading-8 not-italic">Čas (od – do)</div>
          <TimePicker required />
        </div>
        <div className="w-8 h-0.5 bg-gray-300 mt-10" />
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <TimePicker required />
        </div>
      </div>
    </div>
  )
}

export const CityZipCode = ({ className }: FieldGroupsBase) => {
  return (
    <div className="flex flex-row items-start p-0 gap-4">
      <InputField label="Mesto" placeholder="" className="w-full" />
      <InputField label="PSČ" placeholder="" className="w-[150px]" />
    </div>
  )
}

export const DateTimePicker = ({ className }: FieldGroupsBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4', className)}>
      <div className="flex flex-row items-center p-0 gap-4">
        <div className="flex flex-col items-start p-0">
          <div className="text-p-md font-semibold leading-8 not-italic">Date + time picker</div>
          <DatePicker required />
        </div>
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <TimePicker required />
        </div>
      </div>
    </div>
  )
}

export const InputUploadGroup = ({ className }: FieldGroupsBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <InputField label="Label" placeholder="" />
      <div>alebo</div>
      <div>
        <div className="text-p-md font-semibold leading-8 not-italic">Nahrajte súbor</div>
        <Upload
          type="button"
          sizeLimit={5}
          supportedFormats={['.jpg', '.png', '.pdf']}
          value={files6}
          onChange={(newValue) => setFiles6(newValue)}
        />
      </div>
    </div>
  )
}

export const TextareaUploadGroup = ({ className }: FieldGroupsBase) => {
  const [files6, setFiles6] = useState<UploadMinioFile[]>([])
  return (
    <div className={cx('gap-6 w-full flex flex-col items-start p-6', className)}>
      <TextAreaField label="Mesto" placeholder="" className="h-[150px]" />
      <div>alebo</div>
      <div>
        <div className="text-p-md font-semibold leading-8 not-italic">Nahrajte súbor</div>
        <Upload
          type="button"
          sizeLimit={5}
          supportedFormats={['.jpg', '.png', '.pdf']}
          value={files6}
          onChange={(newValue) => setFiles6(newValue)}
        />
      </div>
    </div>
  )
}
