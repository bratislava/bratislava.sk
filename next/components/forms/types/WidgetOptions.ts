import { ExplicitOptionalType } from './ExplicitOptional'

export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: ExplicitOptionalType
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}
