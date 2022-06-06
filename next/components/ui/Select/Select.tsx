import cx from 'classnames';
import * as React from 'react';
import { ReactComponent as ChevronDown } from '../../assets/images/chevron-down.svg';

export interface ISelectOption {
  key: string;
  title: string;
}

interface IProps<T extends ISelectOption> {
  className?: string;
  selectClassName?: string;
  options: T[];
  onChange?: (value: T) => void;
  value: string | T;
  id?: string;
  hasError?: boolean;
  hasIcon?: boolean;
}

export const Select = <T extends ISelectOption>({
  className,
  selectClassName,
  options,
  value: iValue,
  onChange,
  hasError,
  hasIcon = true,
  ...rest
}: IProps<T>) => {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!onChange) return;

    const selectedKey = e.target.value;
    const selectedOption = options.find((opt) => opt.key === selectedKey);
    if (selectedOption) onChange(selectedOption);
  };

  const value = typeof iValue === 'string' ? iValue : iValue?.key;

  return (
    <div className={cx('inline-flex relative items-center', className)}>
      <select
        className={cx(
          'base-input cursor-pointer pr-16 w-full',
          selectClassName,
          { 'base-input--with-error': hasError }
        )}
        onChange={handleChange}
        value={value}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.title}
          </option>
        ))}
      </select>
      {hasIcon && (
        <ChevronDown className="absolute right-0 mr-7 mt-1 pointer-events-none text-primary" />
      )}
    </div>
  );
};

export default Select;
