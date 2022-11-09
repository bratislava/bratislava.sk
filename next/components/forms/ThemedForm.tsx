import { withTheme } from '@rjsf/core'

import SelectFieldRJSF from './SelectField/SelectFieldRJSF'

// you can add custom widgets as well as override the default ones
// we'll want to override all the default widgets listed here https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/
const theme = {
  widgets: {
    SelectField: SelectFieldRJSF
  },
  fields: {

  },
}

export const ThemedForm = withTheme(theme)

export default ThemedForm
