import React from 'react';
import { Wrapper, StyledFieldset } from './Fieldset.styles';

const Fieldset = ({ legend, error, children, ...props }) => {
  return (
    <Wrapper>
      <StyledFieldset>
        <legend>{legend}</legend>
        {children}
      </StyledFieldset>
      {error ? <span>{error}</span> : null}
    </Wrapper>
  );
};

export default Fieldset;
