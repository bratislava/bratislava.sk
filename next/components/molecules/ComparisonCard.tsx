import cx from 'classnames'
import React, { ReactNode } from 'react'

type ComparisonProps = {
  color: 'green' | 'red' | 'white'
  icon: ReactNode
  title: string
  items: string[]
}

const ComparisonCard = ({ title, items, color, icon }: ComparisonProps) => {
  return (
    <li
      className={cx('relative border-2 rounded-lg', {
        'border-success-700 bg-success-100': color === 'green',
        'border-negative-700 bg-negative-100': color === 'red',
        'border-gray-200 bg-white': color === 'white',
      })}
    >
      <div className="flex flex-col p-5 lg:p-8">
        <div
          className={cx('rounded-full w-14 h-14 shrink-0 flex items-center justify-center', {
            'bg-white text-success-700': color === 'green',
            'bg-white text-negative-700': color === 'red',
            'text-gray-700 bg-gray-100': color === 'white',
          })}
        >
          {/* This dev sets "boundaries" for custom icon image from Strapi */}
          <div className="relative w-6 h-6">{icon}</div>
        </div>
        <div className="flex flex-col mt-6">
          <h3 className="text-h3">{title}</h3>
          <ul className="list-disc mt-1 pl-5">
            {items?.map((item) => (
              <li className="mt-3">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default ComparisonCard
