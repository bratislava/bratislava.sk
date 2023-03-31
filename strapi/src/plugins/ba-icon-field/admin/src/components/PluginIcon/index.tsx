import React from 'react'
import styled from 'styled-components'
import { Flex, Icon } from '@strapi/design-system'
import { Alien } from '@strapi/icons'

const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`

const PluginIcon = () => {
  return (
    <IconBox justifyContent="center" alignItems="center" width={7} height={6} hasRadius aria-hidden>
      <Icon as={Alien} />
    </IconBox>
  )
}

export default PluginIcon
