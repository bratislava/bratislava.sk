import PasswordField from '@components/forms/widget-components/PasswordField/PasswordField'
import InputField from 'components/forms/widget-components/InputField/InputField'
import React, { useRef } from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ERROR = 'Error message'

const InputFieldShowCase = () => {
  const myRef = useRef<HTMLInputElement>()
  return (
    <Wrapper direction="column" title="Input Field">
      <Stack direction="column">
        {/* It is possible to pass your own ref if you need to (eg. when using with react-hook-form), but it's not necessary */}
        <InputField label="Label" placeholder="Placeholder" ref={myRef} />
        <InputField label="Label" placeholder="Placeholder" value="Value" />
        <InputField label="Label" placeholder="Placeholder" errorMessage={[ERROR]} />
        <InputField label="Label" placeholder="Placeholder" errorMessage={[ERROR]} disabled />
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
          errorMessage={[ERROR]}
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          required
          errorMessage={[ERROR]}
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
          errorMessage={[ERROR]}
        />
        <InputField
          label="Label"
          placeholder="Placeholder"
          helptext="Help text"
          tooltip="InputField"
          leftIcon="person"
          resetIcon
          errorMessage={[ERROR]}
          disabled
        />
        <PasswordField label="Password" placeholder="Enter your password..." />
      </Stack>
    </Wrapper>
  )
}

export default InputFieldShowCase
