import Spinner from 'components/forms/simple-components/Spinner'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SpinnerShowCase = () => {
  return (
    <Wrapper direction="column" title="Spinner">
      <Stack direction="row">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Stack>
    </Wrapper>
  )
}

export default SpinnerShowCase
