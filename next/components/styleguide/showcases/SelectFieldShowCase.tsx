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
    { value: 'example', label: 'skola'},
    { value: 'stuFei', label: 'STU FEI'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]

  const [selectValueFirst, setSelectValueFirst] = useState<SelectOption[]>(selectOptions.slice(0, 2))
  const [selectValueSecond, setSelectValueSecond] = useState<SelectOption[]>(selectOptions.slice(0, 1))

  const ref = React.createRef<Select>()

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField label="Select Field" options={selectOptions}
                     value={selectValueFirst} onChange={value => setSelectValueFirst(value)}/>
        <SelectField label="Select Field" options={selectOptions} placeholder="Test placeholder"/>
        <SelectField label="Select Field" options={selectOptions} disabled/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} required ref={ref}
                     value={selectValueSecond}
                     onChange={value => {
                       setSelectValueSecond(value)
                       console.log(ref.current?.getValue())
                     }}/>
        <SelectField label="Select Field" options={selectOptions} errorMessage="Test error message"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} description="This is simple description"/>
        <SelectField label="Select Field" options={selectOptions} tooltip="This is example of tooltip text"/>
      </Stack>
      <Stack>
        <SelectField label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     onChange={values => console.log(values)}/>
        <SelectField label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     required
                     onChange={values => console.log(values)}/>
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
