import styled from "styled-components";

export const StyledPokemonList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  a {
    text-decoration: none;
    color: black;
  }
`;
