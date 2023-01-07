import { withTheme } from '@rjsf/core'
import DatePickerWidgetRJSF from 'components/forms/widget-wrappers/DatePickerWidgetRJSF'
import InputFieldWidgetRJSF from 'components/forms/widget-wrappers/InputFieldWidgetRJSF'
import TimePickerWidgetRJSF from 'components/forms/widget-wrappers/TimePickerWidgetRJSF'

import CheckboxWidgetRJSF from './widget-wrappers/CheckboxWidgetRJSF'
import DateFromToWidgetRJSF from './widget-wrappers/fieldGroupsRJSF/DateFromToWidgetRJSF'
import DateTimeWidgetRJSF from './widget-wrappers/fieldGroupsRJSF/DateTimeWidgetRJSF'
import DoubledInputWidgetFieldRJSF from './widget-wrappers/fieldGroupsRJSF/DoubledInputWidgetFieldRJSF'
import InputSelectGroupWidgetFieldRJSF from './widget-wrappers/fieldGroupsRJSF/InputSelectGroupWidgetFieldRJSF'
import InputUploadGroupWidgetRJSF from './widget-wrappers/fieldGroupsRJSF/InputUploadGroupWidgetRJSF'
import TextareaUploadGroupWidgetRJSF from './widget-wrappers/fieldGroupsRJSF/TextareaUploadGroupWidgetRJSF'
import TimeFromToWidgetRJSF from './widget-wrappers/fieldGroupsRJSF/TimeFromToWidgetRJSF'
import RadioButtonsWidgetRJSF from './widget-wrappers/RadioButtonWidgetRJSF'
import SelectFieldWidgetRJSF from './widget-wrappers/SelectFieldWidgetRJSF'
import TextAreaFieldWidgetRJSF from './widget-wrappers/TextAreaFieldWidgetRJSF'
import UploadWidgetRJSF from './widget-wrappers/UploadWidgetRJSF'

// you can add custom widgets as well as override the default ones
// we'll want to override all the default widgets listed here https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/
const theme = {
  widgets: {
    SelectField: SelectFieldWidgetRJSF,
    InputField: InputFieldWidgetRJSF,
    RadioButton: RadioButtonsWidgetRJSF,
    TextArea: TextAreaFieldWidgetRJSF,
    Checkboxes: CheckboxWidgetRJSF,
    Upload: UploadWidgetRJSF,
    DatePicker: DatePickerWidgetRJSF,
    TimePicker: TimePickerWidgetRJSF,
  },
  fields: {
    doubledInput: DoubledInputWidgetFieldRJSF,
    inputUpload: InputUploadGroupWidgetRJSF,
    textareaUpload: TextareaUploadGroupWidgetRJSF,
    inputSelect: InputSelectGroupWidgetFieldRJSF,
    dateFromTo: DateFromToWidgetRJSF,
    timeFromTo: TimeFromToWidgetRJSF,
    dateTime: DateTimeWidgetRJSF,
  },
}

export const ThemedForm = withTheme(theme)

export default ThemedForm
