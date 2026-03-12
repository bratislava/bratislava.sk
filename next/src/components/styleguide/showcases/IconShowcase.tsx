import Icon, { IconName, iconNameMap } from '@/src/components/common/Icon/Icon'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const IconShowCase = () => {
  return (
    <Wrapper direction="column" title="Icons">
      <Stack>
        {Object.keys(iconNameMap).map((name) => {
          return <Icon key={name} name={name as IconName} />
        })}
      </Stack>
    </Wrapper>
  )
}

export default IconShowCase
