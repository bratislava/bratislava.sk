import CheckboxGroup from '../../forms/CheckboxGroup'
import CheckboxGroupItem from '../../forms/CheckBoxGroupItem'
import SingleCheckBox from '../../forms/SingleCheckBox'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const CheckboxShowCase = () => {
    return (
        <Wrapper direction="column" title="Alert">
            <Stack>
                <CheckboxGroup>
                    <CheckboxGroupItem value='value1' isIndeterminate tooltip="This is some tooltip">Value</CheckboxGroupItem>
                    <CheckboxGroupItem value='value2' isDisabled>Value</CheckboxGroupItem>
                    <CheckboxGroupItem value='value3' error tooltip="This is some tooltip with error">Value</CheckboxGroupItem>
                </CheckboxGroup>
            </Stack>
            <Stack>
              <SingleCheckBox value='value4' isIndeterminate tooltip="This is some tooltip">Value</SingleCheckBox>
              <SingleCheckBox value='value5' isDisabled>Value</SingleCheckBox>
              <SingleCheckBox value='value6' error>Value</SingleCheckBox>
            </Stack>
            <Stack>
                <SingleCheckBox value='value7' variant='boxed' tooltip="This is some tooltip">Value</SingleCheckBox>
                <SingleCheckBox value='value8' isIndeterminate variant='boxed' isDisabled >Value</SingleCheckBox>
                <SingleCheckBox value='value9' variant='boxed' error>Value</SingleCheckBox>
            </Stack>
        </Wrapper>
    )
}

export default CheckboxShowCase
