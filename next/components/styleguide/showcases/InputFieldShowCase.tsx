import InputField from 'components/forms/widget-components/InputField/InputField'
import React, { useRef } from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface InputFieldShowCaseBase {}

const InputFieldShowCase = ({}: InputFieldShowCaseBase) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <Wrapper direction="column" title="Input Field">
      <Stack direction="column">
        <InputField ref={ref} label="Label" placeholder="Placeholder" />
        <InputField ref={ref} label="Label" placeholder="Placeholder" value="Value" />
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          errorMessage={['Error message']}
        />
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
      <Stack direction="column">
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          explicitOptional="right"
        />
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          value="Value"
          helptext="Help text"
          tooltip="InputField"
          required
        />
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          required
          errorMessage={['Error message']}
        />
        <InputField
          ref={ref}
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
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="mail"
          resetIcon
        />
        <InputField
          ref={ref}
          label="Label"
          placeholder="Placeholder"
          value="Value"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="call"
          resetIcon
        />
        <InputField
          ref={ref}
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
          ref={ref}
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
