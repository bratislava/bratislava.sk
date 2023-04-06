import { EditIcon, SearchIcon } from '@assets/images'
import Button from '@components/forms/simple-components/Button'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface ButtonShowCaseProps {}

const ButtonStacks = ({ variant }: { variant: 'category' | 'black' | 'negative' }) => (
  <>
    <Stack>
      <Button variant={variant}>Button</Button>
      <Button variant={variant} size="sm">
        Button
      </Button>
      <Button variant={variant} disabled>
        Disabled
      </Button>
      <Button variant={variant} size="sm" disabled>
        Disabled
      </Button>
      <Button variant={variant} icon={<SearchIcon />} />
      <Button variant={variant} icon={<SearchIcon />} size="sm" />
      <Button variant={variant} icon={<SearchIcon />} disabled />
      <Button variant={variant} icon={<SearchIcon />} size="sm" disabled />
      <Button variant={variant} startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={variant} size="sm" startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={variant} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={variant} size="sm" endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={variant} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={variant} size="sm" startIcon={<SearchIcon />} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={variant} startIcon={<SearchIcon />} endIcon={<EditIcon />} disabled>
        Disabled
      </Button>
      <Button
        variant={variant}
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        size="sm"
        disabled
      >
        Disabled
      </Button>
    </Stack>

    {variant !== 'negative' && (
      <Stack>
        <Button variant={`${variant}-outline`}>Button</Button>
        <Button variant={`${variant}-outline`} size="sm">
          Button
        </Button>
        <Button variant={`${variant}-outline`} disabled>
          Disabled
        </Button>
        <Button variant={`${variant}-outline`} size="sm" disabled>
          Disabled
        </Button>
        <Button variant={`${variant}-outline`} icon={<SearchIcon />} />
        <Button variant={`${variant}-outline`} icon={<SearchIcon />} size="sm" />
        <Button variant={`${variant}-outline`} icon={<SearchIcon />} disabled />
        <Button variant={`${variant}-outline`} icon={<SearchIcon />} size="sm" disabled />
        {/* </Stack> */}
        {/* <Stack> */}
        <Button variant={`${variant}-outline`} startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} size="sm" startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} size="sm" endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={`${variant}-outline`} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button
          variant={`${variant}-outline`}
          size="sm"
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
        >
          Button
        </Button>
        <Button
          variant={`${variant}-outline`}
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
          disabled
        >
          Disabled
        </Button>
        <Button
          variant={`${variant}-outline`}
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
          size="sm"
          disabled
        >
          Disabled
        </Button>
      </Stack>
    )}

    <Stack>
      <Button variant={`${variant}-plain`}>Button</Button>
      <Button variant={`${variant}-plain`} size="sm">
        Button
      </Button>
      <Button variant={`${variant}-plain`} disabled>
        Disabled
      </Button>
      <Button variant={`${variant}-plain`} size="sm" disabled>
        Disabled
      </Button>
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} />
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} size="sm" />
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} disabled />
      <Button variant={`${variant}-plain`} icon={<SearchIcon />} size="sm" disabled />
      {/* </Stack> */}
      {/* <Stack> */}
      <Button variant={`${variant}-plain`} startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} size="sm" startIcon={<SearchIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} size="sm" endIcon={<EditIcon />}>
        Button
      </Button>
      <Button variant={`${variant}-plain`} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
        Button
      </Button>

      <Button
        variant={`${variant}-plain`}
        size="sm"
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
      >
        Button
      </Button>
      <Button
        variant={`${variant}-plain`}
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        disabled
      >
        Disabled
      </Button>
      <Button
        variant={`${variant}-plain`}
        size="sm"
        startIcon={<SearchIcon />}
        endIcon={<EditIcon />}
        disabled
      >
        Disabled
      </Button>
    </Stack>
  </>
)

const ButtonShowCase = ({}: ButtonShowCaseProps) => {
  return (
    <Wrapper direction="column" title="Button">
      <div>Note: `icon` should not be used with `startIcon`, `endIcon` or `children` props.</div>
      <ButtonStacks variant="category" />
      <ButtonStacks variant="black" />
      <ButtonStacks variant="negative" />
      <Stack>
        <Button variant="category-link" href="#">
          Link
        </Button>
        <Button variant="category-link" href="#" size="sm">
          Link
        </Button>
      </Stack>
      <Stack>
        <Button variant="black-link" href="#">
          Link
        </Button>
        <Button variant="black-link" href="#" size="sm">
          Link
        </Button>
      </Stack>
    </Wrapper>
  )
}

export default ButtonShowCase
