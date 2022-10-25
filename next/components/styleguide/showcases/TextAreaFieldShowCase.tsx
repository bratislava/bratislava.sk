import TextAreaField from 'components/forms/TextAreaField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TextAreaFieldShowCase = () => {
  return (
    <Wrapper direction="row" title="Text Area Field">
      <Stack>
        <TextAreaField label="Label" placeholder="Placeholder" />
        <TextAreaField label="Label" placeholder="Placeholder" defaultValue="Default message" />
        <TextAreaField label="Label" placeholder="Placeholder" errorMessage="Error message" />
        <TextAreaField label="Label" placeholder="Placeholder" errorMessage="Error message" description="Help text" disabled />
      </Stack>
      <Stack>
        <TextAreaField label="Label" required tooltip="InputField" placeholder="Placeholder" />
        <TextAreaField label="Label" tooltip="InputField" placeholder="Placeholder" value="Value" />
        <TextAreaField label="Label" tooltip="InputField" placeholder="Placeholder" errorMessage="Error message" />
        <TextAreaField label="Label" required tooltip="InputField" placeholder="Placeholder" description="Help text" errorMessage="Error message" disabled />
      </Stack>
    </Wrapper>
  )
}

export default TextAreaFieldShowCase
