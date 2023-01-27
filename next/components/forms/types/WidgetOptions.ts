import { AccordionBase } from '../simple-components/Accordion'

export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: 'none' | 'right' | 'left'
  accordion?: AccordionBase | AccordionBase[]
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}
