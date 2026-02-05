import { Typography } from '@bratislava/component-library'

import { AlertIcon, CheckInCircleIcon, ErrorIcon, InfoIcon } from '@/src/assets/icons'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { Enum_Componentsectionsalert_Alertvariant } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type Props = {
  title: string | null | undefined
  titleLevel?: CardTitleLevel
  text: string | null | undefined
  variant: Enum_Componentsectionsalert_Alertvariant | null | undefined
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-12976&m=dev
 */

const ICON_BY_VARIANT: Record<Enum_Componentsectionsalert_Alertvariant, React.ReactElement> = {
  [Enum_Componentsectionsalert_Alertvariant.Error]: (
    <ErrorIcon className="size-6 text-content-error-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Warning]: (
    <AlertIcon className="size-6 text-content-warning-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Success]: (
    <CheckInCircleIcon className="size-6 text-content-success-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Info]: (
    <InfoIcon className="size-6 text-content-passive-secondary" />
  ),
}

const AlertMessage = ({ title, titleLevel, text, variant, className }: Props) => {
  const icon = ICON_BY_VARIANT[variant || Enum_Componentsectionsalert_Alertvariant.Info]

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg bg-background-passive-secondary p-4 max-lg:flex-col',
        className,
        {
          'bg-background-error-soft-default':
            variant === Enum_Componentsectionsalert_Alertvariant.Error,
          'bg-background-success-soft-default':
            variant === Enum_Componentsectionsalert_Alertvariant.Success,
          'bg-background-warning-soft-default':
            variant === Enum_Componentsectionsalert_Alertvariant.Warning,
        },
      )}
    >
      <div className={cn({ 'max-lg:hidden': !!title })}>{icon}</div>
      <div className="flex flex-col gap-1">
        <Typography variant="h6" as={titleLevel}>
          {title}
        </Typography>
        {text ? <Markdown variant="small" content={text} /> : null}
      </div>
    </div>
  )
}

export default AlertMessage
