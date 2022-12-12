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
      <Stack direction="column">
        <InputSelectGroup
          SelectLabel="Interval odvozu"
          SelectOnChange={() => {}}
          InputLabel="Počet"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectClassName="w-max"
          addNew="Pridať ďalší riadok"
        />
      </Stack>
      <Stack direction="column">
        <DateFromTo label="Dátum (od – do)" />
      </Stack>
      <Stack direction="column">
        <TimeFromTo label="Čas (od – do)" />
      </Stack>
      <Stack direction="column">
        <DoubledInputField label={['Mesto', 'PSČ']} classNames={['w-max', 'sm:w-[100px]']} />
      </Stack>
      <Stack direction="column">
        <DateTimePicker label="Date + time picker" />
      </Stack>
      <Stack direction="column">
        <InputUploadGroup
          InputLabel="Label"
          UploadLabel="Nahrajte súbor"
          middleText="alebo"
          sizeLimit={5}
          supportedFormats={['.jpg', '.png', '.pdf']}
        />
      </Stack>
      <Stack direction="column">
        <TextareaUploadGroup
          TextareaLabel="Mesto"
          UploadLabel="Nahrajte súbor"
          middleText="alebo"
          sizeLimit={5}
          supportedFormats={['.jpg', '.png', '.pdf']}
        />
      </Stack>
    </Wrapper>
  )
}

export default FieldGroupsShowCase
