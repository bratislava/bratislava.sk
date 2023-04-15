import Button, { ButtonProps } from '@components/forms/simple-components/Button'
import { twMerge } from 'tailwind-merge'

export const VerticalCardButton = ({ className, children, ...rest }: ButtonProps) => (
  <Button variant="category" className={twMerge('h-12 w-12 rounded-full', className)} {...rest} />
)
