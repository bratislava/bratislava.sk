import Radio from '../../forms/Radio'
import RadioGroup from '../../forms/RadioGroup'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const RadioButtonShowCase = () => {
  return (
    <Wrapper direction="column" title="Radio">
      <Stack>
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
      <Stack>
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
      <Stack>
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
