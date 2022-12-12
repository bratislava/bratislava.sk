import TextAreaField from 'components/forms/widget-components/TextAreaField/TextAreaField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TextAreaFieldShowCase = () => {
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
          errorMessage={['Error message']}
          className="h-[200px]"
        />
        <TextAreaField
          label="Label"
          placeholder="Placeholder"
          errorMessage={['Error message']}
          description="Help text"
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
          errorMessage={['Error message']}
        />
        <TextAreaField
          label="Label"
          required
          tooltip="InputField"
          placeholder="Placeholder"
          description="Help text"
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default TextAreaFieldShowCase
