import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { PokemonData, PokemonDetails } from "./types";

import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import PokemonInfos from "./components/PokemonInfos";

import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import { Container } from "./components/styles/Container.styled";

// refactor fetches over differents components (useFetch?, useContext?)
// rename fonctions, components (begin to be confusing)
// add try catch for api calls

const getPokemonData = async (offset: number): Promise<PokemonData> => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
  );
  const data = await res.data;
  return data;
};

const getPokemonList = async (offset: number): Promise<PokemonDetails[]> => {
  const data = await getPokemonData(offset);
  const res = data.results;
  const finalResults: PokemonDetails[] = [];
  for (let i = 0; i < res.length; i++) {
    const response = await axios.get(res[i].url);
    finalResults.push(response.data);
  }
  console.log(finalResults);
  return finalResults;
};
//getPokemonList();

function App() {
  const [pokemonList, setPokemonList] = useState([] as PokemonDetails[]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getPokemonList(offset).then((res) =>
      setPokemonList((prev) => [...prev, ...res])
    );
  }, [offset]);

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <Container>
                <PokemonList pokemonList={pokemonList} />
                <button
                  style={{ margin: "30px" }}
                  onClick={() => setOffset((prev) => prev + 30)}>
                  LOAD MORE
                </button>
              </Container>
            }
          />
          <Route path=':id' element={<PokemonInfos />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
