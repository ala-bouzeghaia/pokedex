import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IoSearch, IoShuffle } from "react-icons/io5";
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
    &:hover {
      cursor: pointer;
    }
  }

  select {
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
  }

  .search-container {
    input {
      height: 23px;
      border: none;
      /* padding: 0 10px; */
      /* background-color: red; */
      /*color: white; */

      &:focus {
        outline: none;
      }
      &::placeholder {
        /* color: white; */
      }
    }
  }

  .search-box {
    margin: 0 20px;
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

const Navbar = () => {
  const { setLanguage } = useLanguage();
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const navigate = useNavigate();

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
    <StyledNavbar>
      <Container>
        <Link to='/'>
          <img src='./Pokedex_tool_icon_48.png' alt='logo' />
          pokedex
        </Link>
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
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
