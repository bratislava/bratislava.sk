import React from 'react'

import Banner from '../../forms/simple-components/Banner'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const BannerShowCase = () => {
  return (
    <Wrapper title="Banner">
      <Stack>
        <Banner
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          title="Banner Headline"
          onPress={() => {
            alert('Button was pressed')
          }}
        />
      </Stack>
    </Wrapper>
  )
}

export default BannerShowCase
