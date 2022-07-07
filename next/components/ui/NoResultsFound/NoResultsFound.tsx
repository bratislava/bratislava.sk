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
    <span className="pb-4 text-default font-semibold lg:pb-4 lg:text-lg">{title}</span>
    <span className={cx(messageClassName, 'text-base lg:text-default')}>{message}</span>
  </div>
)
