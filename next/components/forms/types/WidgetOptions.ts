import { AccordionBase } from '../simple-components/Accordion'
import { ExplicitOptionalType } from './ExplicitOptional'

export type FormSpacingType = 'large' | 'default' | 'small' | 'none'

export type WidgetOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: ExplicitOptionalType
  accordion?: AccordionBase | AccordionBase[]
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
  stepOrder: number
}
