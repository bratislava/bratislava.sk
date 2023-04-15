import Button, { ButtonProps } from '@components/forms/simple-components/Button'
import React from 'react'

const CarouselControlButton = (props: ButtonProps) => {
  return <Button variant="category" excludeFromTabOrder {...props} />
}
export default CarouselControlButton
