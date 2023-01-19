export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  helptext?: string
  description?: string
  className?: string
  explicitOptional?: 'none' | 'right' | 'left'
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}
