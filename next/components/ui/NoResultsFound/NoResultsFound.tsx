import NoResultsIlustration from '../../../assets/images/no-results.svg'
import NoResultsIlustrationSmall from '../../../assets/images/no-results-small.svg'
import NoDataResultsFound from '@assets/images/NoResults-Found.svg'
import cx from 'classnames'

import ArrowLeft from '../../../assets/images/arrow-left.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'

export interface NoResultsFoundProps {
  title: string
  message: string
  messageClassName?: string
}

export const NoResultsFound = ({ title, message, messageClassName }: NoResultsFoundProps) => (
  <div className="flex flex-col items-center mt-6">
    {/* TODO: troubleshoot different size icons issue */}
    <NoDataResultsFound />
    <span className="text-default lg:text-lg font-semibold pb-4 lg:pb-4">{title}</span>
    <span className={cx(messageClassName, 'text-base lg:text-default')}>{message}</span>
  </div>
)
