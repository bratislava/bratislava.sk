import InputField from 'components/forms/widget-components/InputField/InputField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface InputFieldShowCaseBase {}

const InputFieldShowCase = ({}: InputFieldShowCaseBase) => {
  return (
    <Wrapper direction="column" title="Input Field">
      <Stack direction="column">
        <InputField label="Label" placeholder="Placeholder" />
        <InputField label="Label" placeholder="Placeholder" value="Value" />
        <InputField label="Label" placeholder="Placeholder" errorMessage={['Error message']} />
        <InputField
          label="Label"
          placeholder="Placeholder"
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
      <Stack direction="column">
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          explicitOptional="right"
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          value="Value"
          helptext="Help text"
          tooltip="InputField"
          required
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          required
          errorMessage={['Error message']}
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          required
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
      <Stack direction="column">
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="mail"
          resetIcon
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          value="Value"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="call"
          resetIcon
        />
        <InputField
          label="Label"
          type="password"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="lock"
          resetIcon
          errorMessage={['Error message']}
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="person"
          resetIcon
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default InputFieldShowCase
