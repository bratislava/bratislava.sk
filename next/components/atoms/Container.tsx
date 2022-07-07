import cx from 'classnames'
import * as React from 'react'

interface IProps {
  className?: string
  children?: React.ReactNode
}

const Container = ({ className, children }: IProps) => (
  <div className={cx(className, 'max-w-screen-1.5xl md:px-12 xl:px-41 md:mx-auto')}>{children}</div>
)

export default Container
