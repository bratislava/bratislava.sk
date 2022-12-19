import SummaryRow from '../../forms/steps/Summary/SummaryRow'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SummaryRowShowCase = () => {
  const schemaField = { title: 'Label' }
  return (
    <Wrapper direction="column" title="Summary">
      <Stack direction="column">
        <div className="w-full">
          <SummaryRow fieldKey="myLabel" schemaField={schemaField} isError />
        </div>
        <div className="w-full">
          <SummaryRow fieldKey="myLabel" schemaField={schemaField} fieldData="Value" />
        </div>
        <div className="w-full">
          <SummaryRow
            fieldKey="myLabel"
            schemaField={schemaField}
            fieldData={['Value1', 'Value2', 'Value3']}
          />
        </div>
        <div className="w-full">
          <SummaryRow fieldKey="myLabel" schemaField={schemaField} fieldData={5} />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default SummaryRowShowCase
