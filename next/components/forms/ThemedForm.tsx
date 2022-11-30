import { withTheme } from '@rjsf/core'

import CheckboxWidgetRJSF from './widgets/CheckboxWidgetRJSF'
import RadioButtonsWidgetRJSF from './widgets/RadioButtonWidgetRJSF'
import SelectFieldWidgetRJSF from './widgets/SelectFieldWidgetRJSF'
import TextAreaFieldWidgetRJSF from './widgets/TextAreaFieldWidgetRJSF'
import UploadWidgetRJSF from './widgets/UploadWidgetRJSF'

// you can add custom widgets as well as override the default ones
// we'll want to override all the default widgets listed here https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/
const theme = {
  widgets: {
    SelectField: SelectFieldWidgetRJSF,
    RadioButton: RadioButtonsWidgetRJSF,
    TextArea: TextAreaFieldWidgetRJSF,
    Checkboxes: CheckboxWidgetRJSF,
    Upload: UploadWidgetRJSF,
  },
  fields: {},
}

export const ThemedForm = withTheme(theme)

export default ThemedForm
