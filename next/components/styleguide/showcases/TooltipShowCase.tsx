import { FC } from 'react'

import Tooltip from '../../forms/info-components/Tooltip/Tooltip'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TooltipShowCaseProps {}

const TooltipShowCase: FC<TooltipShowCaseProps> = ({}: TooltipShowCaseProps) => {
  return (
    <Wrapper title="Tooltip" direction="column">
      <Stack direction="row">
        <p>Position: top-left (default)</p>
        <Tooltip text="tooltip" />
        <Tooltip text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip" />
        <Tooltip text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak." />
        <Tooltip text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak." />
      </Stack>
      <Stack direction="row">
        <p>Position: top-right</p>
        <Tooltip position="top-right" text="tooltip" />
        <Tooltip
          position="top-right"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="top-right"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="top-right"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: bottom-left</p>
        <Tooltip position="bottom-left" text="tooltip" />
        <Tooltip
          position="bottom-left"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="bottom-left"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="bottom-left"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: bottom-right</p>
        <Tooltip position="bottom-right" text="tooltip" />
        <Tooltip
          position="bottom-right"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="bottom-right"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="bottom-right"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: left-top</p>
        <Tooltip position="left-top" text="tooltip" />
        <Tooltip
          position="left-top"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="left-top"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="left-top"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: left-bottom</p>
        <Tooltip position="left-bottom" text="tooltip" />
        <Tooltip
          position="left-bottom"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="left-bottom"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="left-bottom"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: right-top</p>
        <Tooltip position="right-top" text="tooltip" />
        <Tooltip
          position="right-top"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="right-top"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="right-top"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Position: right-bottom</p>
        <Tooltip position="right-bottom" text="tooltip" />
        <Tooltip
          position="right-bottom"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
        />
        <Tooltip
          position="right-bottom"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
        <Tooltip
          position="right-bottom"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
        />
      </Stack>
      <Stack direction="row">
        <p>Without arrow</p>
        <Tooltip position="top-left" text="tooltip" arrow={false} />
        <Tooltip
          position="top-left"
          text="tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip tooltip"
          arrow={false}
        />
        <Tooltip
          position="top-left"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow={false}
        />
        <Tooltip
          position="top-left"
          text="Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak. Heslo musí obsahovať minimálne 8 znakov, veľké a malé písmeno, číslo a špeciálny znak."
          arrow={false}
        />
      </Stack>
    </Wrapper>
  )
}

export default TooltipShowCase
