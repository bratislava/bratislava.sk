import { FC } from 'react'

import Tooltip from '../../forms/info-components/Tooltip/Tooltip'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TooltipShowCaseProps {}

const TooltipShowCase: FC<TooltipShowCaseProps> = ({}: TooltipShowCaseProps) => {
  return (
    <Wrapper title="Tooltip" direction="column">
      <p>
        WARNING: props absolute, top, bottom, left and right are not showed here but in field header
        - they are same as setting classNames to absolute, bottom, top, left and right{' '}
      </p>
      <Stack direction="row">
        <Tooltip text="t" arrow="bottom" alignArrow="left" bottom={30} left={-12} />
        <Tooltip text="tooltip" arrow="bottom" alignArrow="left" bottom={30} left={-12} />
        <Tooltip
          text="This is loooooooo ongggg ggggg ggggggg ggggggg ggggg ggggg ggggggg ggggggg gggggg gggggggg gggggggggong tooltip for multiple lines"
          arrow="bottom"
          alignArrow="left"
          bottom={30}
          left={-12}
        />
        <Tooltip
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow="bottom"
          alignArrow="left"
          bottom={30}
          left={-12}
        />
      </Stack>
      <Stack direction="row">
        <Tooltip text="t" arrow="top" alignArrow="left" top={30} left={-12} />
        <Tooltip text="tooltip" arrow="top" alignArrow="left" top={30} left={-12} />
        <Tooltip
          text="This is loooooooo ongggg ggggg ggggggg ggggggg ggggg ggggg ggggggg ggggggg gggggg gggggggg gggggggggong tooltip for multiple lines"
          arrow="top"
          alignArrow="left"
          top={30}
          left={-12}
        />
        <Tooltip
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow="top"
          alignArrow="left"
          top={30}
          left={-12}
        />
      </Stack>
      <Stack direction="row">
        <Tooltip text="t" arrow="left" alignArrow="left" top={-12} left={30} />
        <Tooltip text="tooltip" arrow="left" alignArrow="left" top={-12} left={30} />
        <Tooltip
          text="This is loooooooo ongggg ggggg ggggggg ggggggg ggggg ggggg ggggggg ggggggg gggggg gggggggg gggggggggong tooltip for multiple lines"
          arrow="left"
          alignArrow="left"
          top={-58}
          left={30}
        />
        <Tooltip
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow="left"
          alignArrow="left"
          top={-35}
          left={30}
        />
      </Stack>
      <Stack direction="row">
        <Tooltip text="t" arrow="right" alignArrow="left" top={-12} right={30} />
        <Tooltip text="tooltip" arrow="right" alignArrow="left" top={-12} right={30} />
        <Tooltip
          text="This is loooooooo ongggg ggggg ggggggg ggggggg ggggg ggggg ggggggg ggggggg gggggg gggggggg gggggggggong tooltip for multiple lines"
          arrow="right"
          alignArrow="left"
          top={-58}
          right={30}
        />
        <Tooltip
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow="right"
          alignArrow="left"
          top={-35}
          right={30}
        />
      </Stack>
    </Wrapper>
  )
}

export default TooltipShowCase
