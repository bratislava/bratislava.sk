import React from 'react';
import cx from 'classnames';

interface IProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const PlainInput = ({
  className,
  icon,
  iconPosition = 'right',
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  IProps) => {
  const hasIcon = !!icon;
  const hasIconLeft = hasIcon && iconPosition === 'left';
  const hasIconRight = hasIcon && iconPosition === 'right';

  return (
    <div
      className={cx(
        'flex w-full border-b-4 border-primary items-center',
        className
      )}
    >
      {hasIconLeft && <div>{icon}</div>}
      <input
        className="focus:outline-none bg-transparent py-2 w-full"
        {...props}
      />
      {hasIconRight && <div>{icon}</div>}
    </div>
  );
};

export default PlainInput;
