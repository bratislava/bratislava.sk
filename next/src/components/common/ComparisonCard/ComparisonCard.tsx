import { Typography } from '@bratislava/component-library'
import { ReactNode } from 'react'

import cn from '@/src/utils/cn'

type ComparisonProps = {
  color: 'green' | 'red' | 'white'
  icon: ReactNode
  title: string
  items: string[]
}

const ComparisonCard = ({ title, items, color, icon }: ComparisonProps) => {
  return (
    <li
      className={cn('relative rounded-lg border', {
        'border-border-success bg-background-success-soft-default': color === 'green',
        'border-border-error bg-background-error-soft-default': color === 'red',
        'border-border-passive-primary bg-background-passive-base': color === 'white',
      })}
    >
      <div className="flex flex-col p-5 lg:p-8">
        <div
          className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-full', {
            'bg-background-passive-base text-content-success-default': color === 'green',
            'bg-background-passive-base text-content-error-default': color === 'red',
            'bg-background-passive-secondary text-content-active-primary-default':
              color === 'white',
          })}
        >
          {/* This dev sets "boundaries" for custom icon image from Strapi */}
          <div className="relative size-6">{icon}</div>
        </div>
        <div className="mt-6 flex flex-col">
          <Typography variant="h3">{title}</Typography>
          <ul className="mt-1 list-disc pl-5">
            {items?.map((item, index) => (
              <li key={index} className="mt-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default ComparisonCard
