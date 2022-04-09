import React, { forwardRef } from 'react';
import Input from 'components/atoms/Input/Input';
import Label from 'components/atoms/Label/Label';
import { Wrapper } from './InputField.styles';

const InputField = forwardRef(({ id, name, type, label, placeholder, error, ...props }, ref) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} ref={ref} placeholder={placeholder} {...props} />
      {error ? <span>{error}</span> : null}
    </Wrapper>
  );
});

export default InputField;
