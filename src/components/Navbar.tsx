import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledNavbar = styled.nav`
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cee9f1;
  margin-bottom: 20px;
  a {
    color: #13161b;
    font-size: 1.5rem;
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <Link to='/'>Pokedex</Link>
    </StyledNavbar>
  );
};

export default Navbar;
