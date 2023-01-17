export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: 'none' | 'right' | 'left'
  markdown?: { title: string; size?: string; content: string }
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}
