export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: boolean
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
  stepOrder: number
}
