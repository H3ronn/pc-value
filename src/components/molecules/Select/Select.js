import React, { forwardRef } from 'react';
import Label from 'components/atoms/Label/Label';
import { Wrapper } from './Select.styles';

const Select = forwardRef(({ id, name, type, label, placeholder, error, children, className, ...props }, ref) => {
  return (
    <Wrapper className={className}>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={name} ref={ref} {...props} defaultValue="">
        {children}
      </select>
      {error ? <span>{error}</span> : null}
    </Wrapper>
  );
});

export default Select;
