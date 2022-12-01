import { withTheme } from '@rjsf/core'
import InputFieldWidgetRJSF from 'components/forms/widgets/InputFieldWidgetRJSF'

import RadioButtonsWidgetRJSF from './widgets/RadioButtonWidgetRJSF'
import UploadWidgetRJSF from './widgets/UploadWidgetRJSF'
import SelectFieldWidgetRJSF from './widgets/SelectFieldWidgetRJSF'
import TextAreaFieldWidgetRJSF from './widgets/TextAreaFieldWidgetRJSF'

// you can add custom widgets as well as override the default ones
// we'll want to override all the default widgets listed here https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/
const theme = {
  widgets: {
    SelectField: SelectFieldWidgetRJSF,
    InputField: InputFieldWidgetRJSF,
    RadioButton: RadioButtonsWidgetRJSF,
    TextArea: TextAreaFieldWidgetRJSF,
    Upload: UploadWidgetRJSF,
  },
  fields: {},
}

export const ThemedForm = withTheme(theme)

export default ThemedForm
