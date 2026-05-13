import { ReactNode } from 'react'

export type LabelSize = 'default' | 'h3' | 'h4' | 'h5' | 'h6'

export interface FieldBaseProps {
  label?: string
  displayOptionalLabel?: boolean
  labelSize?: LabelSize
  helptext?: ReactNode
  helptextFooter?: ReactNode
  errorMessage?: string
}
