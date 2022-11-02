import React, { useState } from 'react'
import { MultiValue } from 'react-select'
import Select from 'react-select/base'

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
  const [selectValueSecond, setSelectValueSecond] = useState<SelectOption[]>(selectOptions.slice(0, 1))
  const [selectValueThird, setSelectValueThird] = useState<SelectOption[]>(selectOptions.slice(0, 4))

  const ref = React.createRef<HTMLDivElement>()

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField label="Select Field" options={selectOptions} type="one"
                     value={selectValueFirst} onChange={value => setSelectValueFirst(value)}/>
        <SelectField label="Select Field" options={selectOptions} placeholder="Test placeholder" type="one"/>
        <SelectField label="Select Field" options={selectOptions} disabled type="one"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider
                     value={selectValueThird} onChange={value => setSelectValueThird(value)} type="multiple"/>
        <SelectField label="Select Field" options={selectOptions} placeholder="Test placeholder" dropdownDivider type="multiple"/>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider disabled type="multiple"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} required ref={ref}
                     value={selectValueSecond} type="one"
                     onChange={value => {
                       setSelectValueSecond(value)
                       console.log(ref.current?.getAttribute('data-value'))
                     }}/>
        <SelectField label="Select Field" options={selectOptions} errorMessage="Test error message" type="one"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} description="This is simple description" type="one"/>
        <SelectField label="Select Field" options={selectOptions} tooltip="This is example of tooltip text" type="one"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     onChange={values => console.log(values)} type="one"/>
        <SelectField label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     required
                     onChange={values => console.log(values)} type="one"/>
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
