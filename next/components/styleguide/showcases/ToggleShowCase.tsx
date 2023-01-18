import { useState } from 'react'

import Toggle from '../../forms/simple-components/Toggle'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ToggleShowCase = () => {
  const [secondToggleSelected, setSecondToggleSelected] = useState<boolean>(true)

  return (
    <Wrapper direction="column" title="Toggle">
      <Stack>
        <Toggle value="firstToggle" defaultSelected />
        <Toggle
          value="secondToggle"
          isSelected={secondToggleSelected}
          onChange={setSecondToggleSelected}
        >
          Value
        </Toggle>
        <Toggle value="thirdToggle" isDisabled>
          Value
        </Toggle>
        <Toggle value="fourthToggle" isDisabled>
          Value
        </Toggle>
        <Toggle value="fifthToggle" isReadOnly>
          Read only
        </Toggle>
        <Toggle value="sixthToggle" />
      </Stack>
    </Wrapper>
  )
}

export default ToggleShowCase
