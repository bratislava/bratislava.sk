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
          InputTooltip="Some Tooltip"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectClassName="sm:w-[400px]"
          addNew="Pridať ďalší riadok"
        />
      </Stack>
      {/* <Stack direction="column"> */}
      {/*  <DateFromTo DateToTooltip="Date To Tooltip" label="Dátum (od – do)" /> */}
      {/* </Stack> */}
      {/* <Stack direction="column"> */}
      {/*  <TimeFromTo TimeFromTooltip="Time From Tooltip" label="Čas (od – do)" /> */}
      {/* </Stack> */}
      {/* <Stack direction="column"> */}
      {/*  <DoubledInputField */}
      {/*    FirstInputLabel="Mesto" */}
      {/*    SecondInputLabel="PSČ" */}
      {/*    FirstInputPlaceholder="" */}
      {/*    SecondInputPlaceholder="" */}
      {/*  /> */}
      {/* </Stack> */}
      {/* <Stack direction="column"> */}
      {/*  <DateTimePicker DateLabel="Date + time picker" /> */}
      {/* </Stack> */}
      {/* <Stack direction="column"> */}
      {/*  <InputUploadGroup */}
      {/*    InputLabel="Label" */}
      {/*    UploadLabel="Nahrajte súbor" */}
      {/*    middleText="alebo" */}
      {/*    UploadSizeLimit={5} */}
      {/*    UploadSupportedFormats={['.jpg', '.png', '.pdf']} */}
      {/*    InputPlaceholder="" */}
      {/*    UploadType="button" */}
      {/*  /> */}
      {/* </Stack> */}
      {/* <Stack direction="column"> */}
      {/*  <TextareaUploadGroup */}
      {/*    TextareaLabel="Mesto" */}
      {/*    UploadLabel="Nahrajte súbor" */}
      {/*    middleText="alebo" */}
      {/*    UploadSizeLimit={5} */}
      {/*    UploadSupportedFormats={['.jpg', '.png', '.pdf']} */}
      {/*    UploadType="button" */}
      {/*  /> */}
      {/* </Stack> */}
    </Wrapper>
  )
}

export default FieldGroupsShowCase
