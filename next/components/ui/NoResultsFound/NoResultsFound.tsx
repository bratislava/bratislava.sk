import { ReactComponent as NoResultsIlustration } from '../../../assets/images/no-results.svg'
import { ReactComponent as NoResultsIlustrationSmall } from '../../../assets/images/no-results-small.svg'
import cx from 'classnames'

import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg'
import { ReactComponent as ArrowRight } from '../../../assets/images/arrow-right.svg'

export interface NoResultsFoundProps {
  title: string
  message: string
  messageClassName?: string
}

export const NoResultsFound = ({ title, message, messageClassName }: NoResultsFoundProps) => (
  <div className="flex flex-col items-center">
    {/* TODO: troubleshoot different size icons issue */}
    <NoResultsIlustrationSmall />
    <span className="text-default lg:text-lg font-semibold pb-6 lg:pb-8">{title}</span>
    <span className={cx(messageClassName, 'text-base lg:text-default')}>{message}</span>
  </div>
)
