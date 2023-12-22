import TextAreaField from 'components/forms/widget-components/TextAreaField/TextAreaField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TextAreaFieldShowCase = () => {
  const ERROR_MESSAGE = 'Error message'
  return (
    <Wrapper direction="column" title="Text Area Field">
      <Stack direction="column">
        <TextAreaField label="Label" placeholder="Placeholder" className="h-[200px]" />
        <TextAreaField
          label="Label"
          placeholder="Placeholder"
          defaultValue="Default message"
          className="h-[200px]"
        />
        <TextAreaField
          label="Label"
          placeholder="Placeholder"
          errorMessage={[ERROR_MESSAGE]}
          className="h-[200px]"
        />
        <TextAreaField
          label="Label"
          placeholder="Placeholder"
          errorMessage={[ERROR_MESSAGE]}
          helptext="Help text"
          disabled
        />
      </Stack>
      <Stack direction="column">
        <TextAreaField label="Label" required tooltip="InputField" placeholder="Placeholder" />
        <TextAreaField label="Label" tooltip="InputField" placeholder="Placeholder" value="Value" />
        <TextAreaField
          label="Label"
          tooltip="InputField"
          placeholder="Placeholder"
          errorMessage={[ERROR_MESSAGE]}
        />
        <TextAreaField
          label="Label"
          required
          tooltip="InputField"
          placeholder="Placeholder"
          helptext="Help text"
          errorMessage={[ERROR_MESSAGE]}
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default TextAreaFieldShowCase
