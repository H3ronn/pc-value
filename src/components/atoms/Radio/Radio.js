import React, { forwardRef } from 'react';
import { StyledLabel, StyledRadio } from './Radio.styles';

const Radio = forwardRef(({ name, type, label, value, ...props }, ref) => {
  return (
    <StyledLabel>
      <StyledRadio name={name} type="radio" value={value} ref={ref} {...props} />
      {label}
    </StyledLabel>
  );
});

export default Radio;
