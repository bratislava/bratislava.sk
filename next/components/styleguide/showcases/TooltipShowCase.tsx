import { FC } from 'react'

import Tooltip from '../../forms/Tooltip'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TooltipShowCaseProps {

}

const TooltipShowCase: FC<TooltipShowCaseProps> = ({}: TooltipShowCaseProps) => {
  return (
    <Wrapper title="Tooltip" direction="column">
      <Stack direction="row">
        <Tooltip text="t"/>
        <Tooltip text="This is loooooooooggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggong tooltip for multiple lines"/>
      </Stack>
    </Wrapper>
  )
}

export default TooltipShowCase
