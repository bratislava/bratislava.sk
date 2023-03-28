import Dropdown from '@components/forms/widget-components/SelectField/Dropdown'
import { SelectOption } from '@components/forms/widget-components/SelectField/SelectField'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const DropdownShowCase = () => {
  const selectOptions: SelectOption[] = [
    { const: '_example', title: 'example', description: 'skola' },
    { const: 'stu_fei', title: 'STU FEI', description: 'feika' },
    { const: 'stu_fiit', title: 'STU FIIT', description: 'fiitka' },
    { const: 'uk_fmfi', title: 'UK FMFI', description: 'matfyz' },
    { const: 'tuke_fei', title: 'TUKE FEI', description: '' },
    { const: 'uniza_feit', title: 'UNIZA FEIT', description: 'UNIZA FEIT' },
  ]

  const valueOne: SelectOption[] = [{ const: 'tuke_fei', title: 'TUKE FEI', description: '' }]

  const valueMulti: SelectOption[] = [
    { const: 'uk_fmfi', title: 'UK FMFI', description: 'matfyz' },
    { const: 'tuke_fei', title: 'TUKE FEI', description: '' },
  ]

  return (
    <Wrapper direction="column" title="Dropdowns">
      <p>
        WARNING: width of dropdowns is full width of parent, i just set it in this styleguide to
        h-64
      </p>
      <Stack>
        <Dropdown enumOptions={selectOptions} value={valueOne} type="one" className="w-64" />
        <Dropdown
          enumOptions={selectOptions}
          value={valueOne}
          type="one"
          divider
          className="w-64"
        />
      </Stack>
      <Stack>
        <Dropdown enumOptions={selectOptions} value={valueMulti} type="multiple" className="w-64" />
        <Dropdown
          enumOptions={selectOptions}
          value={valueMulti}
          type="multiple"
          divider
          className="w-64"
        />
        <Dropdown
          enumOptions={selectOptions}
          value={valueMulti}
          type="multiple"
          selectAllOption
          className="w-64"
        />
        <Dropdown
          enumOptions={selectOptions}
          value={valueMulti}
          type="multiple"
          selectAllOption
          divider
          className="w-64"
        />
      </Stack>
      <Stack>
        <Dropdown enumOptions={selectOptions} value={valueOne} type="arrow" className="w-64" />
        <Dropdown
          enumOptions={selectOptions}
          value={valueOne}
          type="arrow"
          divider
          className="w-64"
        />
      </Stack>
      <Stack>
        <Dropdown enumOptions={selectOptions} value={valueOne} type="radio" className="w-64" />
        <Dropdown
          enumOptions={selectOptions}
          value={valueOne}
          type="radio"
          divider
          className="w-64"
        />
      </Stack>
    </Wrapper>
  )
}

export default DropdownShowCase
