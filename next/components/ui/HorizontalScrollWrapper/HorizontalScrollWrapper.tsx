import cx from 'classnames'

interface IProps {
  className?: string
  children?: React.ReactNode
}

export const HorizontalScrollWrapper = ({ className, children }: IProps) => {
  return (
    <div
      className={cx(
        'flex overflow-x-auto overflow-y-hidden scrollbar-hide lg:overflow-x-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default HorizontalScrollWrapper
