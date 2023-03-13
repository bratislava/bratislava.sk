import cx from 'classnames'

export const AccountContainer = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cx(
      'mx-auto w-full max-w-[696px] md:rounded-lg bg-gray-0 py-6 px-4 md:shadow md:px-12 md:py-8',
      className,
    )}
  >
    {children}
  </div>
)

export default AccountContainer
