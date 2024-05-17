import React, { useState } from 'react'

import SelectFieldDeprecated, {
  SelectOption,
} from '@/components/forms/widget-components/SelectField/SelectFieldDeprecated'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const SelectFieldShowCase = () => {
  const enumOptions: SelectOption[] = [
    {
      const: '_example',
      title: 'exampleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      description: 'skola',
    },
    { const: 'stu_fei', title: 'STU FEI', description: 'feika' },
    { const: 'stu_fiit', title: 'STU FIIT', description: 'fiitka' },
    { const: 'uk_fmfi', title: 'UK FMFI', description: 'matfyz' },
    { const: 'tuke_fei', title: 'TUKE FEI', description: '' },
    { const: 'uniza_feit', title: 'UNIZA FEIT', description: 'UNIZA FEIT' },
  ]

  const [selectValueFirst, setSelectValueFirst] = useState<SelectOption[]>(enumOptions.slice(0, 1))
  const [selectValueSecond, setSelectValueSecond] = useState<SelectOption[]>([])
  const [selectValueThird, setSelectValueThird] = useState<SelectOption[]>(enumOptions.slice(0, 3))
  const [selectValue4, setSelectValue4] = useState<SelectOption[]>([])
  const [selectValue5, setSelectValue5] = useState<SelectOption[]>(enumOptions.slice(2, 3))
  const [selectValue6, setSelectValue6] = useState<SelectOption[]>([])

  return (
    <Wrapper direction="column" title="SelectFieldDeprecated">
      <Stack>
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          type="one"
          value={selectValueFirst}
          onChange={(value) => setSelectValueFirst(value)}
        />
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          placeholder="Test placeholder"
          type="one"
          value={selectValueSecond}
          onChange={(value) => setSelectValueSecond(value)}
        />
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          disabled
          type="one"
          onChange={(value) => console.log(value)}
        />
      </Stack>
      <Stack>
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          value={selectValueThird}
          onChange={(value) => setSelectValueThird(value)}
          type="multiple"
        />
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          selectAllOption
          placeholder="Multi-choice"
          value={selectValue4}
          onChange={(value) => setSelectValue4(value)}
          type="multiple"
        />
      </Stack>
      <Stack>
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          value={selectValue5}
          onChange={(value) => setSelectValue5(value)}
          type="radio"
        />
        <SelectFieldDeprecated
          label="Select Field"
          enumOptions={enumOptions}
          placeholder="Radio"
          value={selectValue6}
          onChange={(value) => setSelectValue6(value)}
          type="radio"
        />
      </Stack>
      <Stack direction="column">
        <SelectFieldDeprecated
          label="Select Field"
          errorMessage={['Error message']}
          type="one"
          onChange={(value) => console.log(value)}
        />
        <SelectFieldDeprecated
          label="Select Field"
          helptext="This is simple description"
          type="one"
          onChange={(value) => console.log(value)}
        />
      </Stack>
      <Stack>
        <SelectFieldDeprecated
          label="Select Field"
          tooltip="This is example of tooltip"
          type="one"
          onChange={(value) => console.log(value)}
        />
        <SelectFieldDeprecated
          label="Select Field"
          tooltip="This is another example of tooltip"
          type="one"
          required
          onChange={(value) => console.log(value)}
        />
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
