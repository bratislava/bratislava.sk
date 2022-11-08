import { Wrapper } from '../Wrapper'
import { Stack } from '../Stack'
import Dropdown from '../../forms/SelectField/Dropdown'
import { EnumOptionsType } from '@rjsf/utils'
import SelectOptions from '../../forms/SelectField/SelectOption'

const DropdownShowCase = () => {
  const enumOptions: EnumOptionsType[] = [
    { value: 'example', label: 'skola'},
    { value: 'stuFei', label: 'STU FEI' },
    { value: 'stuFiit', label: 'STU FIIT' },
    { value: 'ukFmfi', label: 'UK FMFI' },
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]
  const selectOptions: SelectOptions = { enumOptions }

  const valueOne: SelectOptions = {
    enumOptions: [
      { value: 'tukeFei', label: 'TUKE FEI' }
    ]
  }

  const valueMulti: SelectOptions = {
    enumOptions: [
      { value: 'example', label: 'skola'},
      { value: 'ukFmfi', label: 'UK FMFI'}
    ]
  }

  return (
    <Wrapper direction='column' title="Dropdowns">
      <p>WARNING: width of dropdowns is full width of parent, i just set it in this styleguide to h-64</p>
      <Stack>
        <Dropdown options={selectOptions} value={valueOne} type='one' className="w-64"/>
        <Dropdown options={selectOptions} value={valueOne} type='one' divider className="w-64"/>
      </Stack>
      <Stack>
        <Dropdown options={selectOptions} value={valueMulti} type='multiple' className="w-64"/>
        <Dropdown options={selectOptions} value={valueMulti} type='multiple' divider className="w-64"/>
        <Dropdown options={selectOptions} value={valueMulti} type='multiple' selectAllOption className="w-64"/>
        <Dropdown options={selectOptions} value={valueMulti} type='multiple' selectAllOption divider className="w-64"/>
      </Stack>
      <Stack>
        <Dropdown options={selectOptions} value={valueOne} type='arrow' className="w-64"/>
        <Dropdown options={selectOptions} value={valueOne} type='arrow' divider className="w-64"/>
      </Stack>
      <Stack>
        <Dropdown options={selectOptions} value={valueOne} type='radio' className="w-64"/>
        <Dropdown options={selectOptions} value={valueOne} type='radio' divider className="w-64"/>
      </Stack>
    </Wrapper>
  )
}

export default DropdownShowCase
