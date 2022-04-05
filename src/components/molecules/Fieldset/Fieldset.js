import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 0;
`;

const StyledFieldset = styled.fieldset`
  legend {
    font-weight: 500;
    margin-top: 10px;
  }
`;

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
