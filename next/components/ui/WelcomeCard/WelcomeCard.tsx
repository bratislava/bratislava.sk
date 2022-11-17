import cx from 'classnames'
import React from 'react'

export interface WelcomeCardProps {
  className?: string
  image: React.ReactNode
  imageClassName?: string
  title: string
  path: string
}

export const WelcomeCard = ({ className, image, imageClassName, title, path }: WelcomeCardProps) => {
  return (
    <a href={path}>
      <div
        className={cx(
          'flex flex-col gap-8 items-center justify-center border-3 rounded-lg bg-white border-category-600 hover:bg-category-100 cursor-pointer',
          className
        )}
      >
        <div
          className={cx(
            'w-32 h-28 flex items-center justify-center opacity-50 group-hover:text-category-600 group-hover:opacity-100',
            imageClassName
          )}
        >
          {image}
        </div>
        <p className="text-h1 text-category-600 group-hover:font-medium">{title}</p>
      </div>
    </a>
  )
}

export default WelcomeCard
