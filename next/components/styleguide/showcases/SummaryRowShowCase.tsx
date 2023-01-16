import SummaryRow from '../../forms/steps/Summary/SummaryRow'
import { TransformedFormData } from '../../forms/steps/Summary/TransformedFormData'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SummaryRowShowCase = () => {
  return (
    <Wrapper direction="column" title="Summary">
      <Stack direction="column">
        <div className="w-full">
          <SummaryRow
            data={{
              label: 'Label',
              value: '-',
              schemaPath: '',
              isError: true,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            data={{
              label: 'Label',
              value: 'Value',
              schemaPath: '',
              isError: true,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            data={{
              label: 'Label',
              value: '[Value1, Value2, Value3]',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            data={{
              label: 'Label',
              value: '5',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
      </Stack>
      <Stack direction="column">
        <div className="w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Label',
              value: '-',
              schemaPath: '',
              isError: true,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Label',
              value: 'Value',
              schemaPath: '',
              isError: true,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Label',
              value: '[Value1, Value2, Value3]',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
        <div className="w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Label',
              value: '5',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
      </Stack>
    </Wrapper>
  )
}

export default SummaryRowShowCase
