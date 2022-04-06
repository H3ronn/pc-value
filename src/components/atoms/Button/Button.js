import { MDBBtn } from 'mdb-react-ui-kit';
import styled from 'styled-components';

const Button = styled(MDBBtn)`
  min-width: 100px;
  max-width: 200px;
  margin: ${({ $center }) => ($center ? '10px auto 0' : '10px 0')};

  &:focus {
    outline: 4px red solid;
  }
`;

export default Button;
