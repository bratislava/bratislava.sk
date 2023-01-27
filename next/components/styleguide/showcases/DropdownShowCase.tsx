import { EnumOptionsType } from '@rjsf/utils'

import Dropdown from '../../forms/widget-components/SelectField/Dropdown'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const DropdownShowCase = () => {
  const selectOptions: EnumOptionsType[] = [
    { value: 'example', label: 'skola' },
    { value: 'STU FEI', label: 'feika' },
    { value: 'STU FIIT', label: 'fiitka' },
    { value: 'UK FMFI', label: 'matfyz' },
    { value: 'TUKE FEI', label: '' },
    { value: 'UNIZA FEIT', label: 'UNIZA FEIT' },
  ]

  const valueOne: EnumOptionsType[] = [{ value: 'TUKE FEI', label: '' }]

  const valueMulti: EnumOptionsType[] = [
    { value: 'example', label: 'skola' },
    { value: 'UK FMFI', label: 'matfyz' },
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
