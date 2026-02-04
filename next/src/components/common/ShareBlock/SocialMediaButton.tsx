import { PropsWithChildren } from 'react'

import Button, { PolymorphicProps } from '@/src/components/common/Button/Button'

type SocialMediaButtonProps = PropsWithChildren<{
  getSocialLink: (link: string) => string
  startIcon: PolymorphicProps['startIcon']
  className?: string
}>

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24027&m=dev
 */

export const SocialMediaButton = ({
  getSocialLink,
  children,
  startIcon,
  className,
}: SocialMediaButtonProps) => {
  const openSharePage = () => {
    const W = 600
    const H = 400
    const L = screen.width / 2 - W / 2
    const T = screen.height / 2 - H / 2

    window.open(
      getSocialLink(window.location.href),
      'pop',
      `width=${W},height=${H},top=${T},left=${L},scrollbars=0`,
    )
  }

  return (
    <Button
      variant="outline"
      onPress={openSharePage}
      startIcon={startIcon}
      size="large"
      className={className}
    >
      {children}
    </Button>
  )
}

export default SocialMediaButton
