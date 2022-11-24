import InputField from 'components/forms/InputField'
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
        <InputField label="Label" placeholder="Placeholder" errorMessage="Error message" />
        <InputField label="Label" placeholder="Placeholder" errorMessage="Error message" disabled />
      </Stack>
      <Stack direction="column">
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          required
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          value="Value"
          description="Help text"
          tooltip="InputField"
          required
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          required
          errorMessage="Error message"
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          required
          errorMessage="Error message"
          disabled
        />
      </Stack>
      <Stack direction="column">
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          leftIcon
          resetIcon
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          value="Value"
          description="Help text"
          tooltip="InputField"
          leftIcon
          resetIcon
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          leftIcon
          resetIcon
          errorMessage="Error message"
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          description="Help text"
          tooltip="InputField"
          leftIcon
          resetIcon
          errorMessage="Error message"
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default InputFieldShowCase
