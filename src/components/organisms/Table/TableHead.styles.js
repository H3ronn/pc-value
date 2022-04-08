import styled from 'styled-components';

export const TableHeader = styled.th`
  &:last-of-type {
    opacity: 0;
  }
  min-width: 60px;
  span {
    white-space: nowrap;
  }
`;

export const ArrowsIcon = styled.i`
  display: inline-block;
  transform: ${({ $rotate }) => ($rotate ? 'rotate(180deg)' : null)};
  transform-origin: 50% 50%;
  margin-left: 5px;
`;
