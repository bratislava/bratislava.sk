import { withTheme } from '@rjsf/core'

import { ExampleInput } from './widgets/ExampleInput'
import SelectField from './SelectField/SelectField'

// you can add custom widgets as well as override the default ones
// we'll want to override all the default widgets listed here https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/
const theme = {
  widgets: {
    SelectWidget: SelectField
  },
  fields: {
    myCustomField: ExampleInput
  }
}

export const ThemedForm = withTheme(theme)

export default ThemedForm
