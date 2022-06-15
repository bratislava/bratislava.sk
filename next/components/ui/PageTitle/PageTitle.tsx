import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex flex-col w-64')} {...rest}>
    <span className="font-bold text-md sm:text-5xl text-red-universal-300">{title}</span>
    <span className="font-medium text-[16px] sm:text-3xl text-font opacity-50 mt-1 sm:mt-2 whitespace-pre">
      {subtitle}
    </span>
  </h1>
)

export default PageTitle
