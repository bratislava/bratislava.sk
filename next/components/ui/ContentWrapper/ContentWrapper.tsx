import cx from 'classnames'

export interface ContentWrapperProps {
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
}

export const ContentWrapper = ({ className, title, children }: ContentWrapperProps) => {
  const hasTitle = !!title

  return (
    <div className={cx(className, 'max-w-full flex flex-col gap-3 mt-8')}>
      {hasTitle && title}
      <div className="flex flex-col gap-y-2 text-p2 text-gray-600">{children}</div>
    </div>
  )
}

export default ContentWrapper
