 
import { CalendarIcon, EditIcon, SearchIcon } from 'src/assets/icons'

import Button, { PolymorphicProps } from '@/src/components/common/Button/Button'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const ButtonStacks = ({ variantPrefix }: { variantPrefix?: 'negative' }) => {
  const solidVariant: PolymorphicProps['variant'] = variantPrefix
    ? `${variantPrefix}-solid`
    : 'solid'

  const outlineVariant: PolymorphicProps['variant'] = 'outline'

  const plainVariant: PolymorphicProps['variant'] = variantPrefix
    ? `${variantPrefix}-plain`
    : 'plain'

  return (
    <>
      <Stack>
        <Button variant={solidVariant}>
          Button {variantPrefix ? `${variantPrefix}-solid` : 'solid'}
        </Button>
        <Button variant={solidVariant} size="small">
          Button
        </Button>
        <Button variant={solidVariant} isDisabled>
          Disabled
        </Button>
        <Button variant={solidVariant} size="small" isDisabled>
          Disabled
        </Button>
        <Button variant={solidVariant} icon={<SearchIcon />} aria-label="Search" />
        <Button variant={solidVariant} icon={<SearchIcon />} aria-label="Search" size="small" />
        <Button variant={solidVariant} icon={<SearchIcon />} aria-label="Search" isDisabled />
        <Button
          variant={solidVariant}
          icon={<SearchIcon />}
          aria-label="Search"
          size="small"
          isDisabled
        />
        <Button variant={solidVariant} startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={solidVariant} size="small" startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={solidVariant} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={solidVariant} size="small" endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={solidVariant} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button
          variant={solidVariant}
          size="small"
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
        >
          Button
        </Button>
        <Button variant={solidVariant} startIcon={<SearchIcon />} endIcon={<EditIcon />} isDisabled>
          Disabled
        </Button>
        <Button
          variant={solidVariant}
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
          size="small"
          isDisabled
        >
          Disabled
        </Button>
      </Stack>

      {variantPrefix !== 'negative' && (
        <Stack>
          <Button variant={outlineVariant}>
            Button {variantPrefix ? `${variantPrefix}-outline` : 'outline'}
          </Button>
          <Button variant={outlineVariant} size="small">
            Button
          </Button>
          <Button variant={outlineVariant} isDisabled>
            Disabled
          </Button>
          <Button variant={outlineVariant} size="small" isDisabled>
            Disabled
          </Button>
          <Button variant={outlineVariant} icon={<SearchIcon />} aria-label="Search" />
          <Button variant={outlineVariant} icon={<SearchIcon />} aria-label="Search" size="small" />
          <Button variant={outlineVariant} icon={<SearchIcon />} aria-label="Search" isDisabled />
          <Button
            variant={outlineVariant}
            icon={<SearchIcon />}
            aria-label="Search"
            size="small"
            isDisabled
          />
          {/* </Stack> */}
          {/* <Stack> */}
          <Button variant={outlineVariant} startIcon={<SearchIcon />}>
            Button
          </Button>
          <Button variant={outlineVariant} size="small" startIcon={<SearchIcon />}>
            Button
          </Button>
          <Button variant={outlineVariant} endIcon={<EditIcon />}>
            Button
          </Button>
          <Button variant={outlineVariant} size="small" endIcon={<EditIcon />}>
            Button
          </Button>
          <Button variant={outlineVariant} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
            Button
          </Button>
          <Button
            variant={outlineVariant}
            size="small"
            startIcon={<SearchIcon />}
            endIcon={<EditIcon />}
          >
            Button
          </Button>
          <Button
            variant={outlineVariant}
            startIcon={<SearchIcon />}
            endIcon={<EditIcon />}
            isDisabled
          >
            Disabled
          </Button>
          <Button
            variant={outlineVariant}
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
        <Button variant={plainVariant}>
          Button {variantPrefix ? `${variantPrefix}-plain` : 'plain'}
        </Button>
        <Button variant={plainVariant} size="small">
          Button
        </Button>
        <Button variant={plainVariant} isDisabled>
          Disabled
        </Button>
        <Button variant={plainVariant} size="small" isDisabled>
          Disabled
        </Button>
        <Button variant={plainVariant} icon={<SearchIcon />} aria-label="Search" />
        <Button variant={plainVariant} icon={<SearchIcon />} aria-label="Search" size="small" />
        <Button variant={plainVariant} icon={<SearchIcon />} aria-label="Search" isDisabled />
        <Button
          variant={plainVariant}
          icon={<SearchIcon />}
          aria-label="Search"
          size="small"
          isDisabled
        />
        <Button variant={plainVariant} startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={plainVariant} size="small" startIcon={<SearchIcon />}>
          Button
        </Button>
        <Button variant={plainVariant} endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={plainVariant} size="small" endIcon={<EditIcon />}>
          Button
        </Button>
        <Button variant={plainVariant} startIcon={<SearchIcon />} endIcon={<EditIcon />}>
          Button
        </Button>

        <Button
          variant={plainVariant}
          size="small"
          startIcon={<SearchIcon />}
          endIcon={<EditIcon />}
        >
          Button
        </Button>
        <Button variant={plainVariant} startIcon={<SearchIcon />} endIcon={<EditIcon />} isDisabled>
          Disabled
        </Button>
        <Button
          variant={plainVariant}
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
}

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
      <ButtonStacks />
      <ButtonStacks variantPrefix="negative" />
      <Stack>
        <Button variant="link" href="#">
          Link
        </Button>
        <Button variant="link" href="#" size="small">
          Link
        </Button>
        <Button variant="link" href="https://bratislava.sk">
          External link
        </Button>
        <Button variant="link" href="https://bratislava.sk" size="small">
          External link
        </Button>
      </Stack>
      <Stack>
        <Button variant="solid" href="#">
          Link
        </Button>
        <Button variant="solid" href="#" size="small">
          Link
        </Button>
        <Button variant="solid" href="https://bratislava.sk">
          External link
        </Button>
        <Button variant="solid" href="https://bratislava.sk" size="small">
          External link
        </Button>
      </Stack>
      <Stack>
        <Button variant="solid" isLoading>
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
