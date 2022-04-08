import styled from 'styled-components';
import Select from 'components/molecules/Select/Select';

export const TableWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 100px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  min-width: 100vw;
  thead th {
    border-bottom: 2px solid #dee2e6;
  }

  th,
  td {
    border-top: 1px solid #dee2e6;
    padding: 12px;
  }

  th {
    cursor: pointer;
    &:last-of-type {
      cursor: default;
    }
  }

  td {
  }
`;

export const Td = styled.td`
  min-width: ${({ wide }) => (wide ? `350px` : 'fit-content')};
  max-width: 350px;
  word-break: ${({ wide }) => (wide ? `break-all` : 'normal')};
`;

export const Row = styled.tr`
  width: 100%;
  &:hover {
    background-color: #dee2e6;
  }
`;

export const FilterSelect = styled(Select)`
  max-width: 500px;
  margin: 10px auto;
`;

export const ButtonsCell = styled.td`
  div {
    display: flex;
    align-content: center;
  }
  Button {
    margin: 0 5px;
  }
`;