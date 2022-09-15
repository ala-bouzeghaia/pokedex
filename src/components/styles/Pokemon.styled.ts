import styled from "styled-components";

export const StyledPokemon = styled.div`
  border: 1px solid lightgray;
  border-radius: 1rem;
  min-height: 250px;
  width: 180px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
  img {
    width: 150px;
    height: 150px;
  }

  .types-container {
    margin: 10px auto;
    display: flex;
    justify-content: center;
    gap: 10px;
    p {
      border: 1px solid gray;
      border-radius: 1rem;
      padding: 0 10px;
    }
  }
`;
