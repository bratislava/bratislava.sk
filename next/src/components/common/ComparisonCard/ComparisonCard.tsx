import React, { ReactNode } from 'react'

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
      className={cn('relative rounded-lg border-2', {
        'border-success-700 bg-success-100': color === 'green',
        'border-negative-700 bg-negative-100': color === 'red',
        'border-grey-200 bg-white': color === 'white',
      })}
    >
      <div className="flex flex-col p-5 lg:p-8">
        <div
          className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-full', {
            'bg-white text-success-700': color === 'green',
            'bg-white text-negative-700': color === 'red',
            'bg-grey-100 text-grey-700': color === 'white',
          })}
        >
          {/* This dev sets "boundaries" for custom icon image from Strapi */}
          <div className="relative h-6 w-6">{icon}</div>
        </div>
        <div className="mt-6 flex flex-col">
          {/* FIXME Typography. Convert to use Typography. Issue: Probably safe to convert but cant find page where is this used for testing */}
          <h3 className="text-h3">{title}</h3>
          <ul className="mt-1 list-disc pl-5">
            {items?.map((item) => <li className="mt-3">{item}</li>)}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default ComparisonCard
