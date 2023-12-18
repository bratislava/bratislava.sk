import { CalendarIcon, EditIcon, SearchIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const ButtonStacks = ({ variant }: { variant: 'category' | 'black' | 'negative' }) => (
  <>
    <Stack>
      <Button variant={`${variant}-solid`}>Button {variant} solid</Button>
      <Button variant={`${variant}-solid`} size="small">
        Button
      </Button>
      <Button variant={`${variant}-solid`} isDisabled>
        Disabled
      </Button>
      <Button variant={`${variant}-solid`} size="small" isDisabled>
        Disabled
      </Button>
      <Button variant={`${variant}-solid`} icon={<SearchIcon />} aria-label="Search" />
      <Button variant={`${variant}-solid`} icon={<SearchIcon />} aria-label="Search" size="small" />
      <Button variant={`${variant}-solid`} icon={<SearchIcon />} aria-label="Search" isDisabled />
      <Button
        variant={`${variant}-solid`}
        icon={<SearchIcon />}
        aria-label="Search"
        size="small"
        isDisabled
      />
      <Button variant={`${variant}-solid`} startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-solid`} size="small" startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-solid`} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-solid`} size="small" endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-solid`} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button
        variant={`${variant}-solid`}
        size="small"
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
      >
        Button
      </Button>
      <Button
        variant={`${variant}-solid`}
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        isDisabled
      >
        Disabled
      </Button>
      <Button
        variant={`${variant}-solid`}
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        size="small"
        isDisabled
      >
        Disabled
      </Button>
    </Stack>

    {variant !== 'negative' && (
      <Stack>
        <Button variant={`${variant}-outline`}>Button {variant} outline</Button>
        <Button variant={`${variant}-outline`} size="small">
          Button
        </Button>
        <Button variant={`${variant}-outline`} isDisabled>
          Disabled
        </Button>
        <Button variant={`${variant}-outline`} size="small" isDisabled>
          Disabled
        </Button>
        <Button variant={`${variant}-outline`} icon={<SearchIcon />} aria-label="Search" />
        <Button
          variant={`${variant}-outline`}
          icon={<SearchIcon />}
          aria-label="Search"
          size="small"
        />
        <Button
          variant={`${variant}-outline`}
          icon={<SearchIcon />}
          aria-label="Search"
          isDisabled
        />
        <Button
          variant={`${variant}-outline`}
          icon={<SearchIcon />}
          aria-label="Search"
          size="small"
          isDisabled
        />
        {/* </Stack> */}
        {/* <Stack> */}
        <Button variant={`${variant}-outline`} startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} size="small" startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} size="small" endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button
          variant={`${variant}-outline`}
          size="small"
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
        >
          Button
        </Button>
        <Button
          variant={`${variant}-outline`}
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
          isDisabled
        >
          Disabled
        </Button>
        <Button
          variant={`${variant}-outline`}
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
          size="small"
          isDisabled
        >
          Disabled
        </Button>
      </Stack>
    )}

    <Stack>
      <Button variant={`${variant}-plain`}>Button {variant} plain</Button>
      <Button variant={`${variant}-plain`} size="small">
        Button
      </Button>
      <Button variant={`${variant}-plain`} isDisabled>
        Disabled
      </Button>
      <Button variant={`${variant}-plain`} size="small" isDisabled>
        Disabled
      </Button>
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} aria-label="Search" />
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} aria-label="Search" size="small" />
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} aria-label="Search" isDisabled />
      <Button
        variant={`${variant}-plain`}
        icon={<SearchIcon />}
        aria-label="Search"
        size="small"
        isDisabled
      />
      <Button variant={`${variant}-plain`} startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} size="small" startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} size="small" endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
        Button
      </Button>

      <Button
        variant={`${variant}-plain`}
        size="small"
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
      >
        Button
      </Button>
      <Button
        variant={`${variant}-plain`}
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        isDisabled
      >
        Disabled
      </Button>
      <Button
        variant={`${variant}-plain`}
        size="small"
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        isDisabled
      >
        Disabled
      </Button>
    </Stack>
  </>
)

const ButtonShowCase = () => {
  return (
    <Wrapper direction="column" title="Button New">
      <div>
        For link buttons, you can use `hasLinkIcon` to automatically add endIcon (ArrowRight or
        ExternalLink icon).
      </div>
      <div>
        Icon Button should use `icon` and `aria-label` props instead of `children` an cannot be used
        with `startIcon`, `endIcon`.
      </div>
      <div>
        &quot;Naked&quot; icon buttons, e.g. close icons, calendar icon button, should have expanded
        clickable/touchable area. For this case, we have `icon-wrapped` variant.
      </div>
      <div>TODO: Loading spinner</div>
      <ButtonStacks variant="category" />
      <ButtonStacks variant="black" />
      <ButtonStacks variant="negative" />
      <Stack>
        <Button variant="category-link" href="#">
          Link
        </Button>
        <Button variant="category-link" href="#" size="small">
          Link
        </Button>
        <Button variant="category-link" href="https://bratislava.sk">
          External link
        </Button>
        <Button variant="category-link" href="https://bratislava.sk" size="small">
          External link
        </Button>
      </Stack>
      <Stack>
        <Button variant="black-link" href="#">
          Link
        </Button>
        <Button variant="black-link" href="#" size="small">
          Link
        </Button>
        <Button variant="black-link" href="https://bratislava.sk">
          External link
        </Button>
        <Button variant="black-link" href="https://bratislava.sk" size="small">
          External link
        </Button>
      </Stack>
      <Stack>
        <Button variant="category-solid" href="#">
          Link
        </Button>
        <Button variant="category-solid" href="#" size="small">
          Link
        </Button>
        <Button variant="category-solid" href="https://bratislava.sk">
          External link
        </Button>
        <Button variant="category-solid" href="https://bratislava.sk" size="small">
          External link
        </Button>
      </Stack>
      <Stack>
        <Button variant="category-solid" isLoading>
          This is loading button
        </Button>
      </Stack>
      <Stack>
        <Button variant="icon-wrapped" icon={<CalendarIcon />} aria-label="Calendar" />
        <Button variant="icon-wrapped" icon={<CalendarIcon />} aria-label="Calendar" size="small" />
      </Stack>
    </Wrapper>
  )
}

export default ButtonShowCase
