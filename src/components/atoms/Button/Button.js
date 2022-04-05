import { MDBBtn } from 'mdb-react-ui-kit';
import styled from 'styled-components';

const Button = styled(MDBBtn)`
  min-width: 100px;
  max-width: 200px;
  margin: 10px auto;

  &:focus {
    outline: 4px red solid;
  }
`;

export default Button;
