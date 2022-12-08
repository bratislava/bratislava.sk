import { JsonSchema } from '@backend/utils/forms'

interface SummaryRowProps {
  fieldKey: string
  schemaField: JsonSchema
  fieldData?: any
}

const SummaryRow = (props: SummaryRowProps) => {
  const { fieldKey, schemaField, fieldData } = props
  const label = schemaField.title ?? fieldKey

  return (
    <div className="flex flex-row">
      {label} : {JSON.stringify(fieldData, null, '\t')}
    </div>
  )
}

export default SummaryRow
