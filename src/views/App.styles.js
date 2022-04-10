import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  p {
    text-align: center;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Informations = styled.div`
  margin-top: 20px;

  ul {
    margin: 5px 15px;
    width: fit-content;
  }
`;

export const ListHeader = styled.h2`
  text-align: center;
`;

export const ListsSection = styled.section``;

export const InformationLists = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0 30px;
`;
