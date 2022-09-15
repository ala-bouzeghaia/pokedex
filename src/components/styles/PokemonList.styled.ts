import styled from "styled-components";

export const StyledPokemonList = styled.div`
  margin: 0 auto;
  /* display: grid;
  grid-template-columns: repeat(5, 1fr); */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  /* @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
    width: 80%;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
  } */
  a {
    text-decoration: none;
    color: black;
  }
`;
