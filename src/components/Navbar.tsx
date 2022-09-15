import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLanguage } from "./LanguageContext";
import { Container } from "./styles/Container.styled";

export const StyledNavbar = styled.nav`
  height: 8vh;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  /* justify-content: center; */
  //background-color: #cee9f1;
  margin-bottom: 10px;
  padding: 10px;
  a {
    color: #13161b;
    font-size: 1.5rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }

  select {
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
  }
`;

const Navbar = () => {
  const { setLanguage } = useLanguage();

  return (
    <StyledNavbar>
      <Container>
        <Link to='/'>
          <img src='./Pokedex_tool_icon_48.png' alt='logo' />
          pokedex
        </Link>
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
          }}>
          <option value='fr'>Français (fr)</option>
          <option value='en'>English (en)</option>
        </select>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
