import { useState } from 'react'

import Toggle from '../../forms/simple-components/Toggle'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ToggleShowCase = () => {
  const [secondToggleSelected, setSecondToggleSelected] = useState<boolean>(true)

  return (
    <Wrapper direction="column" title="Toggle">
      <Stack>
        <Toggle id="firstToggle" defaultSelected />
        <Toggle
          id="secondToggle"
          isSelected={secondToggleSelected}
          onChange={setSecondToggleSelected}
        >
          Value
        </Toggle>
        <Toggle id="thirdToggle" isDisabled>
          Value
        </Toggle>
        <Toggle id="fourthToggle" isDisabled>
          Value
        </Toggle>
        <Toggle id="fifthToggle" isReadOnly>
          Read only
        </Toggle>
        <Toggle id="sixthToggle" />
      </Stack>
    </Wrapper>
  )
}

export default ToggleShowCase
