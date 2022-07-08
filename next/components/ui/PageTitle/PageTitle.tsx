import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex flex-col w-64')} {...rest}>
    <span className="text-md font-bold text-red-universal-300 sm:text-xxxl">{title}</span>
    <span className="mt-1 whitespace-pre text-default font-medium text-font opacity-50 sm:mt-2 sm:text-lg">
      {subtitle}
    </span>
  </h1>
)

export default PageTitle
