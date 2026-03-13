import { Typography } from '@bratislava/component-library'

import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Icon from '@/src/components/common/Icon/Icon'
import { Enum_Componentsectionsalert_Alertvariant } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type Props = {
  title?: string | undefined | null
  titleLevel?: CardTitleLevel
  variant?: Enum_Componentsectionsalert_Alertvariant
  className?: string
  children: React.ReactNode
}

const ICON_BY_VARIANT: Record<Enum_Componentsectionsalert_Alertvariant, React.ReactElement> = {
  [Enum_Componentsectionsalert_Alertvariant.Error]: (
    <Icon name="error" className="size-6 text-content-error-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Warning]: (
    <Icon name="warning" className="size-6 text-content-warning-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Success]: (
    <Icon name="check-circle" className="size-6 text-content-success-default" />
  ),
  [Enum_Componentsectionsalert_Alertvariant.Info]: (
    <Icon name="info" className="size-6 text-content-passive-secondary" />
  ),
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-12976&m=dev
 */

const AlertMessage = ({
  title,
  titleLevel,
  variant = Enum_Componentsectionsalert_Alertvariant.Info,
  className,
  children,
}: Props) => {
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
      <div className={cn({ 'max-lg:hidden': !!title })}>{ICON_BY_VARIANT[variant]}</div>
      <div className="flex flex-col gap-1">
        {title && (
          <Typography variant="h6" as={titleLevel}>
            {title}
          </Typography>
        )}
        {children}
      </div>
    </div>
  )
}

export default AlertMessage
