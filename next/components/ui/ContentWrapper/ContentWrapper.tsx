import cx from 'classnames'

export interface ContentWrapperProps {
  className?: string
  title?: React.ReactNode
  children?: React.ReactNode
}

export const ContentWrapper = ({ className, title, children }: ContentWrapperProps) => {
  const hasTitle = !!title

  return (
    <div className={cx(className, 'mt-8 flex max-w-full flex-col gap-3')}>
      {hasTitle && title}
      <div className="text-default flex flex-col gap-y-2 text-gray-600">{children}</div>
    </div>
  )
}

export default ContentWrapper
