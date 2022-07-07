import cx from 'classnames'

interface IProps {
  className?: string
  children?: React.ReactNode
}

export const HorizontalScrollWrapper = ({ className, children }: IProps) => {
  return (
    <div className={cx('flex overflow-x-auto lg:overflow-x-hidden overflow-y-hidden scrollbar-hide', className)}>
      {children}
    </div>
  )
}

export default HorizontalScrollWrapper
