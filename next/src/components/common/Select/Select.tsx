import { useId } from 'react'
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionProps,
  Props as ReactSelectProps,
} from 'react-select'

import { CheckIcon, CheckInCircleIcon, ChevronDownIcon, CrossIcon } from '@/src/assets/icons'
import cn from '@/src/utils/cn'

export type SelectOption = { value: string; label: string }

const DropdownIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  ...props
}: DropdownIndicatorProps<Option, IsMulti, Group>) => {
  const { menuIsOpen, isDisabled } = props.selectProps

  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon
        className={cn({ 'rotate-180': menuIsOpen, 'text-content-select-disabled': isDisabled })}
      />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>,
) => {
  return (
    <components.ClearIndicator {...props}>
      <CrossIcon />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <CrossIcon />
    </components.MultiValueRemove>
  )
}

type CustomCheckboxProps = {
  isSelected: boolean
}

const CustomCheckbox = ({ isSelected }: CustomCheckboxProps) => (
  <div
    className={cn(
      'size-7 items-center justify-center rounded-sm border border-border-active-primary-inverted-pressed',
      {
        'bg-background-active-primary-inverted-pressed text-content-active-primary-default':
          isSelected,
        'group-hover:border-border-active-hover': !isSelected,
      },
    )}
  >
    {isSelected && <CheckIcon />}
  </div>
)

const CustomOption = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  children,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  const { isMulti, isSelected } = props

  return (
    <>
      <components.Option {...props}>
        <div>{children}</div>
        <div aria-hidden>
          {isMulti ? (
            <CustomCheckbox isSelected={isSelected} />
          ) : isSelected ? (
            <CheckInCircleIcon />
          ) : null}
        </div>
      </components.Option>
      <div className="mx-5 h-0.5 bg-border-active-default last:hidden" aria-hidden />
    </>
  )
}

/**
 * Based on: https://github.com/bratislava/konto.bratislava.sk/tree/master/next/components/forms/widget-components/SelectField
 * Inspiration: https://www.jussivirtanen.fi/writing/styling-react-select-with-tailwind
 * Docs: https://react-select.com/home
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?node-id=11794-3644&node-type=canvas&m=dev
 */

const SelectField = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  value,
  options,
  onChange = () => null,
  placeholder,
  className,
  ...rest
}: ReactSelectProps<Option, IsMulti, Group>) => {
  const id = useId()

  return (
    <Select
      placeholder={placeholder}
      {...rest}
      id={id}
      unstyled
      value={value}
      onChange={onChange}
      options={options}
      closeMenuOnSelect={!rest.isMulti}
      hideSelectedOptions={false}
      className={cn('w-full', className)}
      // TODO handle tokens properly
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          cn('rounded-lg border bg-background-passive-base hover:cursor-pointer!', {
            'border-border-active-default': isDisabled,
            'border-border-active-focused': isFocused && !isDisabled,
            'border-border-active-default hover:border-border-active-hover':
              !isFocused && !isDisabled,
          }),
        placeholder: ({ isDisabled, isFocused }) =>
          cn('text-content-passive-tertiary', {
            'text-content-select-disabled': isDisabled,
            hidden: isFocused,
          }),
        valueContainer: ({ isDisabled }) =>
          // If there's a long value in select, it stretches the parent element instead of wrapping the text.
          // `[container-type:inline-size]` fixes this for some reason.
          cn('[container-type:inline-size] gap-x-2 gap-y-1 px-3 py-2 lg:px-4 lg:py-3', {
            // if rounded is not applied, the background overflows to the "control"
            'bg-background-select-disabled text-content-select-disabled rounded-l-lg': isDisabled,
          }),
        multiValue: ({ isDisabled }) =>
          cn(
            'items-center gap-1 rounded-sm pr-1.5 pl-2',
            isDisabled ? 'bg-background-select-disabled' : 'bg-background-passive-primary',
          ),
        multiValueLabel: () => 'text-p3',
        multiValueRemove: () =>
          'text-content-passive-secondary bg-background-passive-primary rounded-sm h-5 [&>svg]:w-4 [&>svg]:h-4',
        indicatorsContainer: ({ isDisabled }) =>
          // if rounded is not applied, the background overflows to the "control"
          cn('gap-3 py-2 pr-3 lg:py-3 lg:pr-4', {
            'bg-background-select-disabled rounded-r-lg': isDisabled,
          }),
        clearIndicator: () => 'p-1.5 -m-1.5 rounded-md',
        indicatorSeparator: ({ hasValue, isMulti }) =>
          cn('mx-2 h-6 w-0.5', {
            'bg-border-passive-primary': hasValue && isMulti,
            hidden: !hasValue || !isMulti,
          }),
        dropdownIndicator: () => 'p-1.5 -m-1.5 rounded-md',
        menu: () => 'py-2 mt-2 border bg-background-passive-base rounded-lg',
        groupHeading: () => 'ml-3 mt-2 mb-1 text-content-passive-secondary text-sm',
        option: ({ isFocused }) =>
          cn('flex! items-center justify-between px-5 py-3 hover:cursor-pointer!', {
            'group bg-background-passive-primary': isFocused,
          }),
      }}
      components={{
        Option: (props) => <CustomOption {...props} />,
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
      }}
    />
  )
}

export default SelectField
