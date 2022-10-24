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
        <Tooltip text="t" visible/>
        <Tooltip text="tooltip" visible/>
        <Tooltip text="This is looooooooonggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggong tooltip for multiple lines" visible/>
        <Tooltip text="tooltip" visible={false}/>
      </Stack>
      <Stack direction="row">
        <Tooltip text="Tooltip" visible arrow="top"/>
        <Tooltip text="Tooltip" visible arrow="right"/>
        <Tooltip text="Tooltip" visible arrow="bottom"/>
        <Tooltip text="Tooltip" visible arrow="left"/>
      </Stack>
    </Wrapper>
  )
}

export default TooltipShowCase
