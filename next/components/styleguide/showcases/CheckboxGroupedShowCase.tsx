import Checkbox from '../../forms/widget-components/Checkbox/Checkbox'
import CheckboxGroup from '../../forms/widget-components/Checkbox/CheckboxGroup'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const CheckboxGroupShowCase = () => {
  return (
    <Wrapper direction="column" title="Checkbox Group">
      <Stack direction="column">
        <CheckboxGroup onChange={() => {}}>
          <Checkbox value="value1" isIndeterminate tooltip="This is some tooltip">
            Value
          </Checkbox>
          <Checkbox value="value2">Value</Checkbox>
          <Checkbox value="value3" isDisabled>
            Value
          </Checkbox>
          <Checkbox value="value4" error tooltip="This is some tooltip with error">
            Long text value
          </Checkbox>
        </CheckboxGroup>
      </Stack>
      <Stack direction="column">
        <CheckboxGroup onChange={() => {}}>
          <Checkbox value="value1" variant="boxed" isIndeterminate tooltip="This is some tooltip">
            Value
          </Checkbox>
          <Checkbox value="value2" variant="boxed">
            Value
          </Checkbox>
          <Checkbox value="value3" variant="boxed" isDisabled>
            Value
          </Checkbox>
          <Checkbox value="value4" variant="boxed" error tooltip="This is some tooltip with error">
            Long text value
          </Checkbox>
        </CheckboxGroup>
      </Stack>
    </Wrapper>
  )
}

export default CheckboxGroupShowCase
