import NoDataResultsFound from '@assets/images/NoResults-Found.svg'
import cx from 'classnames'

import ArrowLeft from '../../../assets/images/arrow-left.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import NoResultsIlustration from '../../../assets/images/no-results.svg'
import NoResultsIlustrationSmall from '../../../assets/images/no-results-small.svg'

export interface NoResultsFoundProps {
  title: string
  message: string
  messageClassName?: string
}

export const NoResultsFound = ({ title, message, messageClassName }: NoResultsFoundProps) => (
  <div className="mt-6 flex flex-col items-center">
    {/* TODO: troubleshoot different size icons issue */}
    <NoDataResultsFound />
    <span className="text-h3 pb-4">{title}</span>
    <span className={cx(messageClassName, 'text-p2 lg:text-p1')}>{message}</span>
  </div>
)
