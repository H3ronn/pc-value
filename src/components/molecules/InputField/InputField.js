import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Label from 'components/atoms/Label/Label';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  span {
    text-align: center;
  }
`;

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
