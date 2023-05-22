import { ArrowLeftIcon, ArrowRightIcon } from '@assets/ui-icons'
import Button, { ButtonProps } from '@components/forms/simple-components/Button'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'

type CarouselControlProps = {
  direction: 'left' | 'right'
} & Pick<ButtonProps, 'onPress'>

const CarouselControlButton = ({ direction, onPress }: CarouselControlProps) => {
  const t = useTranslations('Carousel')

  return (
    <Button
      variant="category"
      excludeFromTabOrder
      onPress={onPress}
      className={cx('absolute bottom-0 top-0 z-10 my-auto h-12 w-12 rounded-full', {
        'left-0 -translate-x-1/2 transform': direction === 'left',
        'right-0 translate-x-1/2 transform': direction === 'right',
      })}
      icon={direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      aria-label={direction === 'left' ? t('aria.previous') : t('aria.next')}
    />
  )
}

export default CarouselControlButton
