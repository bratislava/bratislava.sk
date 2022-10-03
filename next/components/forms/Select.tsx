import React, { forwardRef } from 'react';

interface SelectProps {
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <h1>
      SELECT
    </h1>
  )
})

export default Select;
