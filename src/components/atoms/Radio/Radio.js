import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Label from 'components/atoms/Label/Label';

const StyledLabel = styled(Label)`
  display: block;
`;

const Radio = forwardRef(({ name, type, label, value, ...props }, ref) => {
  return (
    <StyledLabel>
      <input name={name} type="radio" value={value} ref={ref} {...props} />
      {label}
    </StyledLabel>
  );
});

export default Radio;
