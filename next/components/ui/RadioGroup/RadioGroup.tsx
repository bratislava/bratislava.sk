import { Radio, RadioProps } from '../Radio/Radio'

export interface RadioGroupProps<T> {
  className?: string
  radioClassName?: string
  options: T[]
  onChange?: (option: T, checked: boolean) => void
  value?: string | T
}

export const RadioGroup = <T extends RadioProps>({
  className,
  radioClassName,
  options,
  onChange,
  value,
}: RadioGroupProps<T>) => {
  return (
    <div className={className}>
      {options.map((opt) => (
        <div key={opt.key} className={radioClassName}>
          <Radio
            className="w-full"
            id={opt.key}
            onChange={(e) => onChange?.(opt, e.target.checked)}
            checked={typeof value === 'string' ? opt.key === value : opt === value}
            {...opt}
          />
        </div>
      ))}
    </div>
  )
}

export default RadioGroup
