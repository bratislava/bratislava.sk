import cx from 'classnames'

export interface NoResultsFoundProps {
  title: string
  message: string
  messageClassName?: string
}

export const NoResultsFound = ({ title, message, messageClassName }: NoResultsFoundProps) => (
  <div className="mt-6 flex flex-col items-center">
    <img src="/NoResults-Found_300px.png" alt="" />
    <span className="text-h3 pb-4">{title}</span>
    <span className={cx(messageClassName, 'text-p2 lg:text-p1')}>{message}</span>
  </div>
)
