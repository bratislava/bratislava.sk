import EditIcon from '@assets/images/forms/edit_icon.svg'
import cx from 'classnames'

import { TransformedFormData } from './TransformedFormData'

interface SummaryRowProps {
  data: TransformedFormData
  size?: 'small' | 'large'
  isEditable?: boolean
  onGoToStep?: () => void
}

const SummaryRow = (props: SummaryRowProps) => {
  const { data, size = 'large', isEditable = true, onGoToStep } = props

  const containerClassName = cx('border-b-2 sm:flex-nowrap flex flex-wrap flex-row py-2.5 gap-2', {
    '[&>div>*]:block border-red-500': data.isError,
    'border-gray-200 [&>div>*]:hover:block': !data.isError,
    'hover:border-gray-700': isEditable,
  })

  const labelClassName = cx('w-full', {
    'text-p1-semibold': size === 'large',
    'text-p2-semibold': size === 'small',
  })

  const valueClassName = cx('grow', {
    'text-p1': size === 'large',
    'text-p2': size === 'small',
  })

  return (
    <div className={containerClassName}>
      <p className={labelClassName}>{data.label}</p>
      <div className="w-full flex flex-row items-center">
        <p className={valueClassName}>{data.value}</p>
        {isEditable && <EditIcon className="cursor-pointer hidden" onClick={onGoToStep} />}
      </div>
    </div>
  )
}

export default SummaryRow
