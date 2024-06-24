import React, { ReactNode } from 'react'
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Select,
  SelectProps,
  SelectValue,
  Text,
  ValidationResult,
} from 'react-aria-components'
import cn from 'utils/cn'

import { CheckInCircleIcon, ChevronDownIcon } from '@/assets/ui-icons'

// This component was copied from Enforcement project and updated to use newer react-aria-components version
// https://github.com/bratislava/enforcement-new/blob/aa888b55c97f756c19dee6cbf0ac8ce1bf6e6c78/components/inputs/select-field.tsx

// docs: https://react-spectrum.adobe.com/react-aria/Select.html#reusable-wrappers
export interface SelectFieldProps<T extends object> extends Omit<SelectProps<T>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

type SelectItemProps = Omit<ListBoxItemProps, 'children'> & {
  label: ReactNode
  description?: string
  isDivider?: boolean
}

export const SelectItem = ({ label, description, isDivider = false, ...rest }: SelectItemProps) => {
  return (
    <ListBoxItem
      {...rest}
      className={({ isHovered, isFocusVisible }) =>
        cn('flex cursor-pointer justify-between px-5 py-3 outline-none', {
          'bg-grey-100': isHovered,
          'ring ring-offset-2': isFocusVisible,
          'after:h-0.5 after:bg-grey-200 after:[&:not(:last-child)]:block': isDivider,
        })
      }
    >
      {({ isSelected }) => (
        <>
          <div className="flex flex-col items-start gap-1">
            <Text slot="label">{label}</Text>
            {description ? <Text slot="description">{description}</Text> : null}
          </div>
          <div className={cn('shrink-0', { hidden: !isSelected })}>
            <CheckInCircleIcon />
          </div>
        </>
      )}
    </ListBoxItem>
  )
}

const SelectField = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  items,
  ...props
}: SelectFieldProps<T>) => {
  const disabled = props.isDisabled

  const style = cn(
    'flex w-full justify-between gap-3 rounded-lg border-2 bg-white px-3 py-2 outline-none ring-offset-2 focus:border-grey-800 focus-visible:ring lg:px-4 lg:py-3',
    {
      'border-grey-200 hover:border-grey-400': !disabled,
      'border-negative-700 hover:border-negative-700': errorMessage && !disabled,
      'pointer-events-none border-grey-300 bg-grey-100': disabled,
    },
  )

  return (
    <Select
      {...props}
      className={cn('flex flex-col gap-1', typeof className === 'string' ? className : '')}
    >
      <Label className="font-semibold">
        {label}
        {props.isRequired ? <span className="text-negative-700"> *</span> : undefined}
      </Label>
      <Button className={style}>
        <SelectValue />
        <span aria-hidden>
          <ChevronDownIcon />
        </span>
      </Button>
      {/* TODO style description and error */}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>

      <Popover
        className="w-[--trigger-width] overflow-y-scroll rounded-md border-2 border-grey-800 bg-white py-2"
        shouldFlip={false}
      >
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </Select>
  )
}

export default SelectField
