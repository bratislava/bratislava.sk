import SearchField from 'components/forms/widget-components/SearchField/SearchField'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SearchFieldShowCase = () => {
  return (
    <Wrapper direction="column" title="Search Field">
      <Stack direction="column">
        <SearchField label="Label" value="Value" placeholder="Placeholder" resetIcon />
        <SearchField label="Label" placeholder="Placeholder" resetIcon />
        <SearchField label="Label" placeholder="Placeholder" />
        <SearchField label="Label" placeholder="Placeholder" errorMessage={['Error message']} />
        <SearchField
          label="Label"
          placeholder="Placeholder"
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
      <Stack direction="column">
        <SearchField
          label="Label"
          required
          helptext="Help text"
          tooltip="SearchField"
          placeholder="Placeholder"
          resetIcon
        />
        <SearchField
          label="Label"
          helptext="Help text"
          tooltip="SearchField"
          placeholder="Placeholder"
          value="Value"
        />
        <SearchField
          label="Label"
          helptext="Help text"
          tooltip="SearchField"
          placeholder="Placeholder"
          errorMessage={['Error message']}
        />
        <SearchField
          label="Label"
          required
          helptext="Help text"
          tooltip="SearchField"
          placeholder="Placeholder"
          errorMessage={['Error message']}
          disabled
        />
      </Stack>
    </Wrapper>
  )
}

export default SearchFieldShowCase
