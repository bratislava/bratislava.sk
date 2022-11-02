import { Wrapper } from '../Wrapper'
import { Stack } from '../Stack'
import SelectOption from '../../forms/SelectField/SelectOption'
import Dropdown from '../../forms/SelectField/Dropdown'

const DropdownShowCase = () => {
  const options: SelectOption[] = [
    { value: 'example', label: 'skola', description: 'this is testing'},
    { value: 'stuFei', label: 'STU FEI', description: 'good choice'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]

  const selectedOne: SelectOption[] = [
    { value: 'tukeFei', label: 'TUKE FEI'},
  ]

  const selectedMulti: SelectOption[] = [
    { value: 'example', label: 'skola', description: 'this is testing'},
    { value: 'ukFmfi', label: 'UK FMFI'},
  ]

  return (
    <Wrapper direction='column' title="Dropdowns">
      <p>WARNING: width of dropdowns is full width of parent, i just set it in this styleguide to h-64</p>
      <Stack>
        <Dropdown options={options} value={selectedOne} type='one' className="w-64"/>
        <Dropdown options={options} value={selectedOne} type='one' divider className="w-64"/>
      </Stack>
      <Stack>
        <Dropdown options={options} value={selectedMulti} type='multiple' className="w-64"/>
        <Dropdown options={options} value={selectedMulti} type='multiple' divider className="w-64"/>
        <Dropdown options={options} value={selectedMulti} type='multiple' selectAllOption className="w-64"/>
        <Dropdown options={options} value={selectedMulti} type='multiple' selectAllOption divider className="w-64"/>
      </Stack>
    </Wrapper>
  )
}

export default DropdownShowCase
