import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IoSearch, IoShuffle } from "react-icons/io5";
import { useLanguage } from "./LanguageContext";
import { Container } from "./styles/Container.styled";

type Props = {
  open: boolean;
  bgColor?: string;
};

export const StyledNavbar = styled.nav<Props>`
  min-height: 8vh;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* flex-wrap: wrap; */
    /* padding: 0 10px; */
    gap: 10px;
    @media (max-width: 768px) {
      /* flex-direction: column; */
      p {
        display: ${({ open }) => (open ? "none" : "")};
      }
    }
  }
  /* div:nth-child(2) {
    flex-direction: column;
  } */

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
    &:hover {
      cursor: pointer;
    }
  }

  select {
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    background-color: white;
  }

  .menu_items-container {
    display: flex;
    /* @media (max-width: 620px) {
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
    } */
    @media (max-width: 560px) {
      /* width: 40%; */
      flex-direction: ${({ open }) => (open ? "row" : "row-reverse")};
      .search-container {
        flex-direction: column-reverse;
        align-items: flex-end;
        gap: 10px;
        .search-box {
          /* width: 55%; */
          display: flex;
          input {
            width: 60%;
          }
        }
      }
    }
    @media (max-width: 320px) {
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;
    }
  }

  .search-container {
    /* position: absolute;
    right: 70px; */
    display: flex;
    gap: 20px;
    input {
      height: 23px;
      border: none;
      background-color: transparent;
      &:focus {
        outline: none;
      }
    }
    @media (max-width: 768px) {
      display: ${({ open }) => (open ? "" : "none")};

      /* position: relative;
      right: 70px; */
    }
  }
  @media (max-width: 620px) {
    .search-container {
      display: ${({ open }) => (open ? "" : "none")};

      /* flex-direction: column;
      gap: 10px; */
    }
  }

  .search-box {
    /* margin: 0 20px; */
    /* padding: 0 10px; */
    flex-wrap: nowrap;
    border-radius: 5px;
    background-color: white;
    border: 1px solid gray;
    svg {
      &:hover {
        cursor: pointer;
      }
    }
    svg:nth-child(2) {
      margin-right: 5px;
    }
  }
`;

const Hamburger = styled.div<Props>`
  @media (max-width: 768px) {
    /* position: absolute;
    top: 20px;
    right: 10px; */
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 0 !important;
    div {
      background-color: ${({ bgColor }) => bgColor};
      width: 30px;
      height: 3px;
      margin: 2.5px 0 2.5px 0;
      border-radius: 1rem;
    }
    div:nth-child(1) {
      transform: ${({ open }) =>
        open ? "rotate(45deg) translate(5px, 6px)" : ""};
      transition: transform 0.5s ease-in;
    }
    div:nth-child(2) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      transition: opacity 0.5s ease-in;
    }
    div:nth-child(3) {
      transform: ${({ open }) =>
        open ? "rotate(-45deg) translate(5px, -6px)" : ""};
      transition: transform 0.5s ease-in;
    }
  }
`;

const Navbar = () => {
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [openHamburger, setOpenHamburger] = useState(false);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);
  const handleSearch = async (pokemon: string) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await res.data;
      navigate(`/${data.id}`);
    } catch (error) {
      console.log(error);
      alert("Pokemon not found");
    }
  };

  const handleRandom = () => {
    const max = 900;
    const randomId = Math.floor(Math.random() * max);
    navigate(`/${randomId}`);
  };

  return (
    <StyledNavbar open={openHamburger}>
      <Container>
        <Link to='/'>
          <img src='./Pokedex_tool_icon_48.png' alt='logo' />
          <p>pokedex</p>
        </Link>
        <div className='menu_items-container'>
          <div className='search-container'>
            <div className='search-box'>
              <input
                type='search'
                placeholder='Search here'
                value={searchedPokemon}
                onChange={(e) => setSearchedPokemon(e.target.value)}></input>
              <IoSearch onClick={() => handleSearch(searchedPokemon)} />
              <IoShuffle onClick={handleRandom} />
            </div>

            <select
              onChange={(e) => {
                setLanguage(e.target.value);
              }}>
              <option value='fr'>Français (fr)</option>
              <option value='en'>English (en)</option>
            </select>
          </div>
          <Hamburger
            open={openHamburger}
            bgColor={location.pathname === "/" ? "gray" : "white"}
            onClick={() => {
              setOpenHamburger(!openHamburger);
            }}>
            <div></div>
            <div></div>
            <div></div>
          </Hamburger>
        </div>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
