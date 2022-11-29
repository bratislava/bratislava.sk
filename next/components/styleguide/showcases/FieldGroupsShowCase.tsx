import {
  CityZipCode,
  DateGroup,
  DateTimePicker,
  InputSelectGroup,
  InputUploadGroup,
  TextareaUploadGroup,
  TimeGroup,
} from 'components/forms/FieldGroups'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const FieldGroupsShowCase = () => {
  return (
    <Wrapper direction="column" title="Field Group">
      <Stack direction="column">
        <InputSelectGroup />
      </Stack>
      <Stack direction="column">
        <DateGroup />
      </Stack>
      <Stack direction="column">
        <TimeGroup />
      </Stack>
      <Stack direction="column">
        <CityZipCode />
      </Stack>
      <Stack direction="column">
        <DateTimePicker />
      </Stack>
      <Stack direction="column">
        <InputUploadGroup />
      </Stack>
      <Stack direction="column">
        <TextareaUploadGroup />
      </Stack>
    </Wrapper>
  )
}

export default FieldGroupsShowCase
