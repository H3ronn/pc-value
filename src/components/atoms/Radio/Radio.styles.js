import styled from 'styled-components';
import Label from 'components/atoms/Label/Label';

export const StyledLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledRadio = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #262626;
  box-shadow: inset 0 0 0 1.5px #262626;
  transition: box-shadow 0.2s ease-in;

  &:focus {
    outline: 4px red solid;
  }

  &:checked {
    box-shadow: inset 0 0 0 6px #262626;
  }
`;
