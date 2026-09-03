import { Button, Typography } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import { CommonLinkFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title: string
  text?: string | null
  link: CommonLinkFragment
  variant: 'dark' | 'inverted'
  className?: string
}

/**
 * Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=5548-2813&m=dev
 */

const AnnouncementBannerSection = ({ title, text, link, variant, className }: Props) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-between gap-3 rounded-xl bg-content-active-primary-default p-8 text-content-active-primary-inverted-default lg:flex-row lg:gap-6',
        {
          'bg-content-active-primary-inverted-default text-content-active-primary-default':
            variant === 'inverted',
        },
        className,
      )}
    >
      <Icon name="info" className="size-9 max-lg:hidden" />

      <div className="flex flex-1 flex-col justify-between gap-3 lg:flex-row lg:gap-0">
        <div className="flex flex-col justify-between gap-2 lg:max-w-170">
          <Typography variant="h3" as="h2">
            {title}
          </Typography>

          {text ? <Typography variant="p-small">{text}</Typography> : null}
        </div>

        <div className="flex flex-col justify-center">
          <Button
            fullWidthMobile
            variant={variant === 'dark' ? 'solid-inverted' : 'solid'}
            {...getLinkProps(link)}
          />
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBannerSection
