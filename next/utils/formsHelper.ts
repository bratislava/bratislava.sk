import { FormSpacingType } from 'components/forms/types/WidgetOptions'

export const formSpacingHandler = (space: FormSpacingType): string => {
  switch (space) {
    case 'none':
      return '0'
    case 'large':
      return '40px'
    case 'default':
      return '32px'
    case 'small':
      return '24px'
    default:
      return '0'
  }
}
