import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Label from 'components/atoms/Label/Label';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 10px auto;
  span {
    text-align: center;
  }
  select {
    background-color: white;
    border: #a1a1a1 solid 1px;
    font-size: 16px;
    border-radius: 6px;
    padding: 8px 12px;
  }
`;

const Select = forwardRef(({ id, name, type, label, placeholder, error, children, ...props }, ref) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={name} ref={ref} {...props} defaultValue="">
        {children}
      </select>
      {error ? <span>{error}</span> : null}
    </Wrapper>
  );
});

export default Select;
