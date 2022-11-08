import React, { useState } from 'react'

import SelectField from '../../forms/SelectField/SelectField'
import SelectOption from '../../forms/SelectField/SelectOption'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'
import SelectOptions from '../../forms/SelectField/SelectOption'
import { EnumOptionsType } from '@rjsf/utils'

interface SelectFieldShowCaseProps {

}

const SelectFieldShowCase = () => {
  const enumOptions: EnumOptionsType[] = [
      { value: 'example', label: 'skola'},
      { value: 'stuFei', label: 'STU FEI' },
      { value: 'stuFiit', label: 'STU FIIT' },
      { value: 'ukFmfi', label: 'UK FMFI' },
      { value: 'tukeFei', label: 'TUKE FEI' },
      { value: 'unizaFeit', label: 'UNIZA FEIT' }
    ]
  const selectOptions: SelectOptions = { enumOptions }

  const [selectValueFirst, setSelectValueFirst] = useState<SelectOptions>({ enumOptions: enumOptions.slice(0, 2) })
  const [selectValueSecond, setSelectValueSecond] = useState<SelectOptions>({ enumOptions: [] })
  const [selectValueThird, setSelectValueThird] = useState<SelectOptions>({ enumOptions: enumOptions.slice(0, 3) })
  const [selectValue4, setSelectValue4] = useState<SelectOptions>({ enumOptions: [] })
  const [selectValue5, setSelectValue5] = useState<SelectOptions>({ enumOptions: enumOptions.slice(2, 3) })
  const [selectValue6, setSelectValue6] = useState<SelectOptions>({ enumOptions: [] })

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField label="Select Field" options={selectOptions} type="one"
                     value={selectValueFirst} onChange={value => setSelectValueFirst(value)}/>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider placeholder="Test placeholder" type="one"
                     value={selectValueSecond} onChange={value => setSelectValueSecond(value)}/>
        <SelectField label="Select Field" options={selectOptions} value={{}} disabled type="one" onChange={value => console.log(value)}/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider
                     value={selectValueThird} onChange={value => setSelectValueThird(value)} type="multiple"/>
        <SelectField label="Select Field" options={selectOptions} selectAllOption placeholder="Multi-choice"
                     value={selectValue4} onChange={value => setSelectValue4(value)} type="multiple" />
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={selectOptions} dropdownDivider
                     value={selectValue5} onChange={value => setSelectValue5(value)} type="radio"/>
        <SelectField label="Select Field" options={selectOptions} placeholder="Radio"
                     value={selectValue6} onChange={value => setSelectValue6(value)} type="radio"/>
      </Stack>
      <Stack direction="column">
        <SelectField label="Select Field" options={{ }} value={{}} errorMessage="Test error message" type="one" onChange={value => console.log(value)}/>
        <SelectField label="Select Field" options={{ }} value={{}} description="This is simple description" type="one" onChange={value => console.log(value)}/>
      </Stack>
      <Stack>
        <SelectField label="Select Field" options={{}} value={{}} tooltip="This is example of tooltip" type="one" onChange={value => console.log(value)}/>
        <SelectField label="Select Field" options={{}} value={{}} tooltip="This is another example of tooltip" type="one" required onChange={value => console.log(value)}/>
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
