import React from 'react'

import Radio from '../../forms/RadioButton/Radio'
import RadioGroup from '../../forms/RadioButton/RadioGroup'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const RadioButtonShowCase = () => {
  return (
    <Wrapper direction="column" title="Spinner">
      <Stack direction="column">
        <RadioGroup label="Basic">
          <Radio value="one" tooltip="This is some tooltip1">
            One
          </Radio>
          <Radio value="two" isDisabled>
            Two
          </Radio>
          <Radio value="three" error tooltip="This is some tooltip3">
            Three
          </Radio>
        </RadioGroup>
      </Stack>
      <Stack direction="column">
        <RadioGroup label="Boxed">
          <Radio value="one1" variant="boxed" tooltip="This is some tooltip1">
            One
          </Radio>
          <Radio value="two1" variant="boxed" isDisabled>
            Huge text
          </Radio>
          <Radio value="three1" variant="boxed" error>
            Three
          </Radio>
        </RadioGroup>
      </Stack>
      <Stack direction='column'>
        <RadioGroup label="Card" defaultValue="two">
          <Radio value="one2" variant="card" tooltip="This is some tooltip1">
            One
          </Radio>
          <Radio value="two2" variant="card" isDisabled>
            Two
          </Radio>
          <Radio value="three2" variant="card" error>
            Three
          </Radio>
        </RadioGroup>
      </Stack>
    </Wrapper>
  )
}

export default RadioButtonShowCase
