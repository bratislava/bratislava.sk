import React from 'react'

import {
  DateFromTo,
  DateTimePicker,
  DoubledInputField,
  InputSelectGroup,
  InputUploadGroup,
  TextareaUploadGroup,
  TimeFromTo,
} from '../../forms/groups'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const FieldGroupsShowCase = () => {
  return (
    <Wrapper direction="column" title="Field Group">
      <Stack direction="row">
        <InputSelectGroup
          SelectLabel="Interval odvozu"
          InputLabel="Počet"
          InputTooltip="Some Tooltip"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectClassName="sm:w-[400px]"
          addNew="Pridať ďalší riadok"
          saveFormData={() => {}}
          propKeys={[]}
        />
      </Stack>
      <Stack direction="row">
        <DateFromTo
          DateToTooltip="Date To Tooltip"
          label="Dátum (od – do)"
          DateFromOnChange={() => {}}
          DateToOnChange={() => {}}
        />
      </Stack>
      <Stack direction="row">
        <TimeFromTo TimeFromTooltip="Time From Tooltip" label="Čas (od – do)" />
      </Stack>
      <Stack direction="row">
        <DoubledInputField
          FirstInputLabel="Mesto"
          SecondInputLabel="PSČ"
          FirstInputPlaceholder=""
          SecondInputPlaceholder=""
        />
      </Stack>
      <Stack direction="row">
        <DateTimePicker DateLabel="Date picker" TimeLabel="Time picker" />
      </Stack>
      <Stack direction="row">
        <InputUploadGroup
          InputLabel="Label"
          UploadLabel="Nahrajte súbor"
          middleText="alebo"
          UploadSizeLimit={5}
          UploadSupportedFormats={['.jpg', '.png', '.pdf']}
          InputPlaceholder=""
          UploadType="button"
        />
      </Stack>
      <Stack direction="row">
        <TextareaUploadGroup
          TextareaLabel="Mesto"
          UploadLabel="Nahrajte súbor"
          middleText="alebo"
          UploadSizeLimit={5}
          UploadSupportedFormats={['.jpg', '.png', '.pdf']}
          UploadType="button"
        />
      </Stack>
    </Wrapper>
  )
}

export default FieldGroupsShowCase
