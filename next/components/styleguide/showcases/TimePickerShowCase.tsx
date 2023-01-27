import TimePicker from '../../forms/widget-components/DateTimePicker/TimePicker'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TimePickerShowCaseProps {}

const TimePickerShowCase = ({}: TimePickerShowCaseProps) => {
  return (
    <Wrapper direction="column" title="Time Picker">
      <Stack direction="column">
        <TimePicker label="Label" />
        <TimePicker label="Label" errorMessage={['Error message']} />
        <TimePicker label="Label" errorMessage={['Error message']} disabled />
      </Stack>
      <Stack direction="column">
        <TimePicker label="Label" required tooltip="Time Picker" description="Help text" />
        <TimePicker
          label="Label"
          errorMessage={['Error message']}
          required
          tooltip="Time Picker"
          description="Help text"
        />
        <TimePicker
          label="Label"
          errorMessage={['Error message']}
          disabled
          required
          tooltip="Time Picker"
          description="Help text"
        />
      </Stack>
    </Wrapper>
  )
}

export default TimePickerShowCase
