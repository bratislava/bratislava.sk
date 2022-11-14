import ProgressBar from 'components/forms/ProgressBar'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ProgressBarShowCase = () => {
  return (
    <Wrapper direction="column" title="Progress Bar">
      <Stack direction="column">
        <ProgressBar value={0}/>
        <ProgressBar value={69}/>
        <ProgressBar value={10} type='success'/>
        <ProgressBar value={51} type='success'/>
      </Stack>
    </Wrapper>
  )
}

export default ProgressBarShowCase