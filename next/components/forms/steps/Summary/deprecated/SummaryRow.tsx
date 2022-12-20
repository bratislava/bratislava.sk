import EditIcon from '@assets/images/forms/edit_icon.svg'
import { JsonSchema } from '@backend/utils/forms'
import cx from 'classnames'

interface SummaryRowProps {
  fieldKey: string
  schemaField: JsonSchema
  fieldData?: JsonSchema | string | number | boolean | object | []
  isError?: boolean
  size?: 'small' | 'large'
  onGoToStep?: () => void
}

const SummaryRow = (props: SummaryRowProps) => {
  const { fieldKey, schemaField, fieldData, isError, size = 'large', onGoToStep } = props
  const label = typeof schemaField !== 'boolean' ? schemaField.title ?? fieldKey : fieldKey
  const value =
    !fieldData ||
    (Array.isArray(fieldData) && fieldData.length === 0) ||
    (typeof fieldData === 'object' && Object.keys(fieldData).length === 0)
      ? '-'
      : JSON.stringify(fieldData, null, '\t').replaceAll('"', '')

  const containerClassName = cx('border-b-2 sm:flex-nowrap flex flex-wrap flex-row py-2.5 gap-2', {
    '[&>div>*]:block border-red-500': isError,
    'border-gray-200 hover:border-gray-700 [&>div>*]:hover:block': !isError,
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
      <p className={labelClassName}>{label}</p>
      <div className="w-full flex flex-row items-center">
        <p className={valueClassName}>{value}</p>
        <EditIcon className="cursor-pointer hidden" onClick={onGoToStep} />
      </div>
    </div>
  )
}

export default SummaryRow
