import { EnumOptionsType } from '@rjsf/utils'
import React, { useState } from 'react'

import SelectField from '../../forms/widget-components/SelectField/SelectField'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface SelectFieldShowCaseProps {}

const SelectFieldShowCase = () => {
  const enumOptions: EnumOptionsType[] = [
    { value: 'example', label: 'skola' },
    { value: 'STU FEI', label: 'feika' },
    { value: 'STU FIIT', label: 'fiitka' },
    { value: 'UK FMFI', label: 'matfyz' },
    { value: 'TUKE FEI', label: '' },
    { value: 'UNIZA FEIT', label: 'UNIZA FEIT' },
  ]

  const [selectValueFirst, setSelectValueFirst] = useState<EnumOptionsType[]>(
    enumOptions.slice(0, 1),
  )
  const [selectValueSecond, setSelectValueSecond] = useState<EnumOptionsType[]>([])
  const [selectValueThird, setSelectValueThird] = useState<EnumOptionsType[]>(
    enumOptions.slice(0, 3),
  )
  const [selectValue4, setSelectValue4] = useState<EnumOptionsType[]>([])
  const [selectValue5, setSelectValue5] = useState<EnumOptionsType[]>(enumOptions.slice(2, 3))
  const [selectValue6, setSelectValue6] = useState<EnumOptionsType[]>([])

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          type="one"
          value={selectValueFirst}
          onChange={(value) => setSelectValueFirst(value)}
        />
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          placeholder="Test placeholder"
          type="one"
          value={selectValueSecond}
          onChange={(value) => setSelectValueSecond(value)}
        />
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          disabled
          type="one"
          onChange={(value) => console.log(value)}
        />
      </Stack>
      <Stack>
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          value={selectValueThird}
          onChange={(value) => setSelectValueThird(value)}
          type="multiple"
        />
        <SelectField
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
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          dropdownDivider
          value={selectValue5}
          onChange={(value) => setSelectValue5(value)}
          type="radio"
        />
        <SelectField
          label="Select Field"
          enumOptions={enumOptions}
          placeholder="Radio"
          value={selectValue6}
          onChange={(value) => setSelectValue6(value)}
          type="radio"
        />
      </Stack>
      <Stack direction="column">
        <SelectField
          label="Select Field"
          errorMessage={['Error message']}
          type="one"
          onChange={(value) => console.log(value)}
        />
        <SelectField
          label="Select Field"
          helptext="This is simple description"
          type="one"
          onChange={(value) => console.log(value)}
        />
      </Stack>
      <Stack>
        <SelectField
          label="Select Field"
          tooltip="This is example of tooltip"
          type="one"
          onChange={(value) => console.log(value)}
        />
        <SelectField
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
