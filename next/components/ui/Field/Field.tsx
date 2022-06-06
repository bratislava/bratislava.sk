import cx from 'classnames';
import * as React from 'react';

export interface FieldProps {
  children?: React.ReactNode;
  tooltip?: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  error?: string;
}

export const Field = ({
  children,
  tooltip,
  className,
  id,
  title,
  error,
}: FieldProps) => {
  return (
    <div className={cx(className, 'mt-8')}>
      {(title || tooltip) && (
        <div className="flex justify-between md:justify-start space-x-2 items-center mb-3">
          <label className="text-base md:text-default" htmlFor={id}>
            {title}
          </label>
          {tooltip}
        </div>
      )}
      {children}

      {error && (
        <p className="text-center sm:text-left text-error text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
