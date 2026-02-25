import { Typography } from '@bratislava/component-library'

import cn from '@/src/utils/cn'

export type BadgeProps = {
  label: string
  backgroundColor?: string | null | undefined
  className?: string
}

/**
 * Figma: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=4031-20882&t=WtDyPHEz6aYOukym-4
 */

const Badge = ({ label, backgroundColor, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        'flex w-fit items-center justify-center rounded-sm bg-background-passive-primary px-2 text-content-passive-secondary',
        className,
      )}
      style={{ backgroundColor: backgroundColor ?? undefined }}
    >
      <Typography variant="p-small">{label}</Typography>
    </div>
  )
}

export default Badge
