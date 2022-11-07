import React, { useState } from 'react'

import SelectField from '../../forms/SelectField/SelectField'
import SelectOption from '../../forms/SelectField/SelectOption'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface SelectFieldShowCaseProps {

}

const SelectFieldShowCase = () => {
  const selectOptions: SelectOption[] = [
    { value: 'example', label: 'skola', description: 'this is testing'},
    { value: 'stuFei', label: 'STU FEI', description: 'good choice'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]

  const [selectValueFirst, setSelectValueFirst] = useState<SelectOption[]>(selectOptions.slice(0, 2))
  const [selectValueSecond, setSelectValueSecond] = useState<SelectOption[]>([])
  const [selectValueThird, setSelectValueThird] = useState<SelectOption[]>(selectOptions.slice(0, 3))
  const [selectValue4, setSelectValue4] = useState<SelectOption[]>([])
  const [selectValue5, setSelectValue5] = useState<SelectOption[]>(selectOptions.slice(2, 3))
  const [selectValue6, setSelectValue6] = useState<SelectOption[]>([])

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField label="Select Field" options={selectOptions} type="one"
                     value={selectValueFirst} onChange={value => setSelectValueFirst(value)}/>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider placeholder="Test placeholder" type="one"
                     value={selectValueSecond} onChange={value => setSelectValueSecond(value)}/>
        <SelectField label="Select Field" options={selectOptions} disabled type="one"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider
                     value={selectValueThird} onChange={value => setSelectValueThird(value)} type="multiple"/>
        <SelectField label="Select Field" options={selectOptions} selectAllOption placeholder="Multi-choice"
                     value={selectValue4} onChange={value => setSelectValue4(value)} type="multiple"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider
                     value={selectValue5} onChange={value => setSelectValue5(value)} type="radio"/>
        <SelectField label="Select Field" options={selectOptions} placeholder="Radio"
                     value={selectValue6} onChange={value => setSelectValue6(value)} type="radio"/>
      </Stack>
      <Stack direction="column">
        <SelectField label="Select Field" options={[]} errorMessage="Test error message" type="one"/>
        <SelectField label="Select Field" options={[]} description="This is simple description" type="one"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={[]} tooltip="This is example of tooltip" type="one"/>
        <SelectField label="Select Field" options={[]} tooltip="This is another example of tooltip" type="one" required/>
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
