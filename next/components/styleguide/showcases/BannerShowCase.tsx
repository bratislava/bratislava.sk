import { CommonLinkFragment, Enum_Componentsectionsbanner_Variant } from '@backend/graphql'
import Banner from '@components/ui/Banner/Banner'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const BannerShowCase = () => {
  return (
    <Wrapper title="Banner">
      <Stack>
        <Banner
          variant={Enum_Componentsectionsbanner_Variant.Color}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          title="Banner Headline"
          primaryLink={{ label: 'Primary button', url: '#' } as CommonLinkFragment}
          secondaryLink={{ label: 'Secondary button', url: '#' } as CommonLinkFragment}
          tertiaryLink={{ label: 'Tertiary button', url: '#' } as CommonLinkFragment}
        />
      </Stack>
    </Wrapper>
  )
}

export default BannerShowCase
