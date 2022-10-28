import DatePicker from '../../forms/DateTimePicker/DatePicker'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface DatePickerShowCaseProps {}

const DatePickerShowCase = ({}: DatePickerShowCaseProps) => {
  return (
    <Wrapper direction="column" title="Date Picker">
      <Stack direction="column">
        <DatePicker label="Label" />
        <DatePicker label="Label" errorMessage="Error message" />
        <DatePicker label="Label" errorMessage="Error message" disabled />
      </Stack>
      <Stack direction="column">
        <DatePicker label="Label" tooltip="Date Picker" description="Help text" required />
        <DatePicker label="Label" errorMessage="Error message" tooltip="Date Picker" description="Help text" required />
        <DatePicker
          label="Label"
          errorMessage="Error message"
          tooltip="Date Picker"
          description="Help text"
          required
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default DatePickerShowCase
