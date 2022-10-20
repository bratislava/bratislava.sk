import SearchField from 'components/forms/SearchField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SearchFieldShowCase = () => {
  const [text, setText] = React.useState('Value')
  return (
    <Wrapper direction='column' title='Search Field'>
      <Stack direction='column'>
        <SearchField label='Label' value={text} placeholder='Placeholder' onChange={(el) => setText(el)} resetIcon />
        <SearchField label='Label' placeholder='Placeholder' resetIcon />
        <SearchField label='Label' placeholder='Placeholder' onChange={(el) => setText(el)}/>
        <SearchField label="Label" placeholder="Placeholder" errorMessage="Error message" />
        <SearchField label="Label" placeholder="Placeholder" errorMessage="Error message" disabled />
      </Stack>
      <Stack direction="column">
        <SearchField label="Label" required description="Help text" tooltip="SearchField" placeholder="Placeholder" resetIcon/>
        <SearchField label="Label" description="Help text" tooltip="SearchField" placeholder="Placeholder" value="Value" />
        <SearchField label="Label" description="Help text" tooltip="SearchField" placeholder="Placeholder" errorMessage="Error message" />
        <SearchField label="Label" required description="Help text" tooltip="SearchField" placeholder="Placeholder" errorMessage="Error message" disabled />
      </Stack>
    </Wrapper>
  )
}

export default SearchFieldShowCase
