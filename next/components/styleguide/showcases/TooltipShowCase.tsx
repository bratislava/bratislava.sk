import { FC } from 'react'

import Tooltip from '../../forms/Tooltip'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TooltipShowCaseProps {

}

const TooltipShowCase: FC<TooltipShowCaseProps> = ({}: TooltipShowCaseProps) => {
  return (
    <Wrapper title="Tooltip" direction="column">
      <p>WARNING: props absolute, top, bottom, left and right are not showed here but in field header - they are same as setting classNames to absolute, bottom-0, top-0, left-0 and right-0 </p>
      <Stack direction="row">
        <Tooltip text="t" visible/>
        <Tooltip text="tooltip" visible/>
        <Tooltip text="This is looooooooonggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggong tooltip for multiple lines" visible/>
        <Tooltip text="tooltip" visible={false}/>
      </Stack>
      <Wrapper direction="row" noBorder>
        <Stack direction="column">
          <Tooltip text="Tooltip" arrow="top" alignArrow="left" visible/>
          <Tooltip text="Tooltip" arrow="top" alignArrow="center" visible/>
          <Tooltip text="Tooltip" arrow="top" alignArrow="right" visible/>
        </Stack>
        <Stack direction="column">
          <Tooltip text="Tooltip" arrow="bottom" alignArrow="left" visible/>
          <Tooltip text="Tooltip" arrow="bottom" alignArrow="center" visible/>
          <Tooltip text="Tooltip" arrow="bottom" alignArrow="right" visible/>
        </Stack>
        <Stack direction="column">
          <Tooltip text="Tooltip" arrow="right" alignArrow="left" visible/>
          <Tooltip text="Tooltip" arrow="right" alignArrow="center" visible/>
          <Tooltip text="Tooltip" arrow="right" alignArrow="right" visible/>
        </Stack>
        <Stack direction="column">
          <Tooltip text="Tooltip" arrow="left" alignArrow="left" visible/>
          <Tooltip text="Tooltip" arrow="left" alignArrow="center" visible/>
          <Tooltip text="Tooltip" arrow="left" alignArrow="right" visible/>
        </Stack>
      </Wrapper>
    </Wrapper>
  )
}

export default TooltipShowCase
