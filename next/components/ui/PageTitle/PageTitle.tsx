import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex flex-col w-64')} {...rest}>
    <span className="text-h3 sm:text-h1-lg font-bold text-primary">{title}</span>
    <span className="text-h3 sm:text-h1-lg font-bold text-primary">{subtitle}</span>
  </h1>
)

export default PageTitle
