import { Typography } from '@bratislava/component-library'

import cn from '@/src/utils/cn'

export type BadgeProps = {
  label: string
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-13191&t=1yDFNfZXZRpnFCDr-4
 */

const Badge = ({ label, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        'flex w-fit items-center justify-center rounded-sm bg-background-passive-primary px-2 text-content-passive-secondary',
        className,
      )}
    >
      <Typography variant="p-small">{label}</Typography>
    </div>
  )
}

export default Badge
