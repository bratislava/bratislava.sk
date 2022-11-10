import cx from 'classnames'
import React from 'react'

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string | null
}

export const PageTitle = ({ className, title, subtitle, ...rest }: PageTitleProps) => (
  <h1 className={cx(className, 'flex flex-col w-64')} {...rest}>
    {/* TODO change to font size from config */}
    <span className="text-h3 text-primary font-bold sm:text-[48px] sm:leading-[62px]">{title}</span>
    <span className="text-h3 text-primary font-bold sm:text-[48px] sm:leading-[62px]">{subtitle}</span>
  </h1>
)

export default PageTitle
