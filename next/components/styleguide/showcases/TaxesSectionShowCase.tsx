import TaxesSection from 'components/forms/segments/TaxesSection/TaxesSection'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TaxesSectionShowCase = () => {
  return (
    <Wrapper direction="column" title="TaxesSection">
      <Stack direction="column">
        <TaxesSection />
      </Stack>
    </Wrapper>
  )
}

export default TaxesSectionShowCase
