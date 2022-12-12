import EditIcon from '@assets/images/forms/edit_icon.svg'
import { JsonSchema } from '@backend/utils/forms'
import cx from 'classnames'

interface SummaryRowProps {
  fieldKey: string
  schemaField: JsonSchema
  fieldData?: JsonSchema
  onGoToStep?: () => void
}

const SummaryRow = (props: SummaryRowProps) => {
  const { fieldKey, schemaField, fieldData, onGoToStep } = props
  const label = typeof schemaField !== 'boolean' ? schemaField.title ?? fieldKey : fieldKey
  const value = fieldData ? JSON.stringify(fieldData, null, '\t').replaceAll('"', '') : '-'

  const containerClassName = cx(
    'border-b-2 sm:flex-nowrap flex flex-wrap flex-row py-2.5 gap-2 border-gray-200 hover:border-gray-700 [&>div>*]:hover:block',
  )

  return (
    <div className={containerClassName}>
      <p className="text-p1-semibold w-full ">{label}</p>
      <div className="w-full flex flex-row items-center">
        <p className="text-p1 grow">{value}</p>
        <EditIcon className="cursor-pointer hidden" onClick={onGoToStep} />
      </div>
    </div>
  )
}

export default SummaryRow
