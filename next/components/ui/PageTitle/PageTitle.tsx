import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex w-64 flex-col')} {...rest}>
    {/* TODO change to font size from config */}
    <span className="text-h3 font-bold text-category-600 sm:text-[48px] sm:leading-[62px]">
      {title}
    </span>
    <span className="text-h3 font-bold text-category-600 sm:text-[48px] sm:leading-[62px]">
      {subtitle}
    </span>
  </h1>
)

export default PageTitle
