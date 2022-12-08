import React from 'react'

import Radio from '../../forms/widget-components/RadioButton/Radio'
import RadioGroup from '../../forms/widget-components/RadioButton/RadioGroup'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const RadioButtonShowCase = () => {
  return (
    <Wrapper direction="column" title="Radio Button">
      <Stack direction="column">
        <RadioGroup onChange={() => {}}>
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
        <RadioGroup onChange={() => {}}>
          <Radio value="one1" variant="boxed" tooltip="This is some tooltip1">
            Some random
          </Radio>
          <Radio value="two1" variant="boxed" isDisabled>
            Huge text
          </Radio>
          <Radio value="three1" variant="boxed" error tooltip="This is some tooltip1">
            Three
          </Radio>
        </RadioGroup>
      </Stack>
      <Stack direction="column">
        <RadioGroup defaultValue="two" onChange={() => {}}>
          <Radio value="one2" variant="card" tooltip="This is some tooltip1" className="w-[400px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
