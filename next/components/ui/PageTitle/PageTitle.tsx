import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex flex-col w-64')} {...rest}>
    <span className="text-md font-bold text-primary sm:text-xxxl">{title}</span>
    <span className="text-md font-bold text-primary sm:text-xxxl">{subtitle}</span>
  </h1>
)

export default PageTitle
