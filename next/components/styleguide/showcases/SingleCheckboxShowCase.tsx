import SingleCheckbox from 'components/forms/SingleCheckbox'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SingleCheckboxShowCase = () => {
  return (
    <Wrapper direction="column" title="Single Checkbox">
      <Stack>
        <SingleCheckbox value='value4' isIndeterminate tooltip="This is some tooltip">Value</SingleCheckbox>
        <SingleCheckbox value='value5' isDisabled>Value</SingleCheckbox>
        <SingleCheckbox value='value6' error>Value</SingleCheckbox>
      </Stack>
      <Stack>
        <SingleCheckbox value='value7' variant='boxed' tooltip="This is some tooltip">Value</SingleCheckbox>
        <SingleCheckbox value='value8' isIndeterminate variant='boxed' isDisabled >Value</SingleCheckbox>
        <SingleCheckbox value='value9' variant='boxed' error>Value</SingleCheckbox>
      </Stack>
    </Wrapper>
  )
}

export default SingleCheckboxShowCase
