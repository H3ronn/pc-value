import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* gap: 20px; */

  p {
    text-align: center;
  }
`;

export const Informations = styled.div`
  margin-top: 20px;
  ul {
    margin: 5px 15px;
  }
`;

export const InformationLists = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
