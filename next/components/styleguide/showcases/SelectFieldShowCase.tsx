import { Wrapper } from '../Wrapper'
import { Stack } from '../Stack'
import SelectField from '../../forms/SelectField'
import { MultiValue } from 'react-select'
import { useState } from 'react'

interface SelectFieldShowCaseProps {

}

const SelectFieldShowCase = () => {
  const selectOptions: MultiValue<unknown> = [
    { value: 'example', label: 'skola'},
    { value: 'stuFei', label: 'STU FEI'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]
  const [selectValueFirst, setSelectValueFirst] = useState<MultiValue<unknown>>(selectOptions.slice(0, 2))

  return (
    <Wrapper direction="column" title="SelectField">
      <Stack>
        <SelectField name="select-test" label="Select Field" options={selectOptions}
                     value={selectValueFirst} onChange={value => setSelectValueFirst(value)}/>
        <SelectField name="select-test" label="Select Field" options={selectOptions} placeholder="Test placeholder"/>
        <SelectField name="select-test" label="Select Field" options={selectOptions} disabled/>
      </Stack>
      <Stack>
        <SelectField name="select-test" label="Select Field" options={selectOptions} required/>
        <SelectField name="select-test" label="Select Field" options={selectOptions} errorMessage="Test error message"/>
      </Stack>
      <Stack>
        <SelectField name="select-test" label="Select Field" options={selectOptions} description="This is simple description"/>
        <SelectField name="select-test" label="Select Field" options={selectOptions} tooltip="This is example of tooltip text"/>
      </Stack>
      <Stack>
        <SelectField name="select-test" label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     onChange={values => console.log(values)}/>
        <SelectField name="select-test" label="Select Field"
                     options={selectOptions} description="simple description"
                     errorMessage="Test error message" tooltip="This is another example of tooltip"
                     required
                     onChange={values => console.log(values)}/>
      </Stack>
    </Wrapper>
  )
}

export default SelectFieldShowCase
