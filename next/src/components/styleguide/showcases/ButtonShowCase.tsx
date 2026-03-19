/* eslint-disable i18next/no-literal-string */
import { Button, ButtonProps } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import cn from '@/src/utils/cn'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

type ButtonVariant = ButtonProps['variant']

// All button variants from Button.tsx, grouped for display
const variants: Record<string, ButtonVariant[]> = {
  basic: [
    'solid',
    'outline',
    'outline-soft',
    'plain',
    'solid-inverted',
    'negative-solid',
    'negative-plain',
  ],
  link: ['link', 'link-inverted'],
  iconWrapped: ['icon-wrapped', 'icon-wrapped-negative-margin'],
}

type ButtonExampleProps = Omit<ButtonProps, 'aria-label'>

const basicButtonExamples = {
  'size-default': [
    { children: 'Default' },
    { isDisabled: true, children: 'Disabled' },
    { icon: true },
    { startIcon: true, children: 'Start icon' },
    { endIcon: true, children: 'End icon' },
    { startIcon: true, endIcon: true, children: 'Both icons' },
    { isLoading: true, loadingText: 'Loading…' },
  ],
  'size-small': [
    { size: 'small', children: 'Small' },
    { size: 'small', isDisabled: true, children: 'Small disabled' },
    { size: 'small', icon: true },
    { size: 'small', startIcon: true, children: 'Start icon' },
    { size: 'small', endIcon: true, children: 'End icon' },
    { size: 'small', startIcon: true, endIcon: true, children: 'Both icons' },
    { size: 'small', isLoading: true, loadingText: 'Loading…' },
  ],
} satisfies Record<string, ButtonExampleProps[]>

const StackableButton = ({
  variant,
  buttonExample,
}: {
  variant: ButtonVariant
  buttonExample: ButtonExampleProps
}) => {
  return buttonExample.icon ? (
    <Button
      variant={variant}
      icon={<Icon name="search" />}
      aria-label="Search"
      size={buttonExample.size}
      isDisabled={buttonExample.isDisabled}
      isLoading={buttonExample.isLoading}
    />
  ) : (
    <Button
      variant={variant}
      size={buttonExample.size}
      isDisabled={buttonExample.isDisabled}
      isLoading={buttonExample.isLoading}
      loadingText={buttonExample.loadingText}
      startIcon={buttonExample.startIcon ? <Icon name="search" /> : undefined}
      endIcon={buttonExample.endIcon ? <Icon name="edit" /> : undefined}
    >
      {buttonExample.children}
    </Button>
  )
}

const ButtonShowCase = () => {
  return (
    <Wrapper direction="column" title="Button">
      <div>
        Link buttons show an end icon by default (ArrowRight for internal links, Export for external
        links, ArrowDown for anchors). Use <code>hasLinkIcon=&#123;false&#125;</code> to hide it.
      </div>
      <div>
        Icon Button should use <code>icon</code> and <code>aria-label</code> props instead of{' '}
        <code>children</code> and cannot be used with <code>startIcon</code>, <code>endIcon</code>.
      </div>
      <div>
        &quot;Naked&quot; icon buttons (e.g. close, calendar) should have expanded clickable area.
        Use <code>icon-wrapped</code> or <code>icon-wrapped-negative-margin</code> variants.
      </div>

      {/* Basic variants */}
      {variants.basic.map((variant) => (
        <div key={variant}>
          <strong>variant=&quot;{variant}&quot;</strong>
          <Stack
            className={cn({
              'bg-background-passive-inverted-base': variant === 'solid-inverted',
            })}
          >
            {basicButtonExamples['size-default'].map((buttonExample, index) => (
              <StackableButton key={index} variant={variant} buttonExample={buttonExample} />
            ))}
            <div className="w-full" aria-hidden />
            {basicButtonExamples['size-small'].map((buttonExample, index) => (
              <StackableButton key={index} variant={variant} buttonExample={buttonExample} />
            ))}
          </Stack>
        </div>
      ))}

      {/* Unstyled */}
      <div>
        <strong>variant=&quot;unstyled&quot;</strong>
        <Stack>
          <Button variant="unstyled">Unstyled</Button>
          <Button variant="unstyled" size="small">
            Small
          </Button>
          <Button variant="unstyled" isDisabled>
            Disabled
          </Button>
        </Stack>
      </div>

      {/* Link variants */}
      {variants.link.map((variant) => (
        <div key={variant}>
          <strong>variant=&quot;{variant}&quot;</strong>
          <Stack>
            <Button variant={variant} href="#">
              Link
            </Button>
            <Button variant={variant} href="#" size="small">
              Link small
            </Button>
            <Button variant={variant} href="https://bratislava.sk">
              External link
            </Button>
            <Button variant={variant} href="https://bratislava.sk" size="small">
              External small
            </Button>
            <Button variant={variant} href="#anchor">
              Anchor link
            </Button>
            <Button variant={variant} href="#anchor" size="small">
              Anchor small
            </Button>
          </Stack>
        </div>
      ))}

      {/* Icon-wrapped variants */}
      {variants.iconWrapped.map((variant) => (
        <div key={variant}>
          <strong>variant=&quot;{variant}&quot;</strong>
          <Stack>
            <Button variant={variant} icon={<Icon name="calendar" />} aria-label="Calendar" />
            <Button
              variant={variant}
              icon={<Icon name="calendar" />}
              aria-label="Calendar"
              size="small"
            />
          </Stack>
        </div>
      ))}
    </Wrapper>
  )
}

export default ButtonShowCase
