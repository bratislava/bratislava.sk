import Toggle from 'components/forms/Toggle'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ToggleShowCase = () => {
    return (
        <Wrapper direction="column" title="Toggle">
            <Stack>
                <Toggle value='oneToggle'>Value</Toggle>
                <Toggle value='twoToggle' defaultSelected>Value</Toggle>
                <Toggle value='threeToggle' isDisabled>Value</Toggle>
                <Toggle value='fourToggle' isDisabled defaultSelected>Value</Toggle>
                <Toggle value='fiveToggle' isReadOnly>Read only</Toggle>
                <Toggle value='sixToggle' isReadOnly defaultSelected>Read only selected</Toggle>
            </Stack>
        </Wrapper>
    )
}

export default ToggleShowCase