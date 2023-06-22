import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { PokemonData } from "./types";

import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import PokemonInfos from "./components/PokemonInfos";

import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import { Container } from "./components/styles/Container.styled";
import { Button } from "./components/styles/Button.styled";
import { useLanguage } from "./components/LanguageContext";

// refactor fetches over differents components (useFetch?, useContext?)
// rename fonctions, components (begin to be confusing)
// add try catch for api calls

// const LANGUAGE = "fr";

const getPokemonData = async (
  limit: number,
  offset: number
): Promise<PokemonData> => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.data;
  return data;
};
type pokemonType = {
  type: {
    name: string;
  };
};
type finalResultType = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: pokemonType[];
};

const getPokemonList = async (
  limit: number,
  offset: number,
  language: string
): Promise<finalResultType[]> => {
  const data = await getPokemonData(limit, offset);
  const res = data.results;
  const finalResults: finalResultType[] = [];
  for (let i = 0; i < res.length; i++) {
    const response = await axios.get(res[i].url);
    // console.log("response", response.data);
    const id = await response.data.id;
    const sprites = await response.data.sprites;
    const resName = await axios.get(response.data.species.url);
    // console.log("resName", resName.data);
    const name = await resName.data.names.filter(
      (elt: { language: { name: string } }) => elt.language.name === language
    )[0].name;

    const typesList = await response.data.types;
    const types: pokemonType[] = [];
    for (let i = 0; i < typesList.length; i++) {
      const resType = await axios.get(typesList[i].type.url);

      const typeName: string = await resType.data.names.filter(
        (elt: { language: { name: string } }) => elt.language.name === language
      )[0].name;
      const type = { name: typeName };
      // console.log(type);
      types.push({ type });
    }
    finalResults.push({ id, name, sprites, types });
  }
  // console.log("finalResults", finalResults);
  return finalResults;
};
//getPokemonList();

function App() {
  const [pokemonList, setPokemonList] = useState([] as finalResultType[]);
  const [offset, setOffset] = useState(0);
  const { language } = useLanguage();
  const location = useLocation();
  // console.log(location);
  // console.log("language", language);
  const lastOffset = useRef(0);
  const lastLanguage = useRef("fr");
  // console.log(lastOffset.current, lastLanguage.current);
  // console.log(lastOffset.current, offset);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (language === lastLanguage.current) {
      const limit = 30;
      getPokemonList(limit, offset, language).then((res) => {
        setPokemonList((prev) => [...prev, ...res]);
        setLoading(false);
      });
      lastOffset.current = offset;
    } else {
      lastLanguage.current = language;
      setOffset(lastOffset.current);
      setPokemonList([]);
      getPokemonList(
        lastOffset.current !== 0 ? lastOffset.current + 30 : 30,
        0,
        language
      ).then((res) => {
        setPokemonList(res);
        setLoading(false);
      });
    }
  }, [offset, language]);

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <AnimatePresence mode='wait'>
          <Routes key={location.pathname} location={location}>
            <Route
              path='/'
              element={
                <>
                  <Navbar />
                  {pokemonList.length !== 0 && !loading ? (
                    <Container>
                      <PokemonList pokemonList={pokemonList} />
                      <Button onClick={() => setOffset((prev) => prev + 30)}>
                        LOAD MORE
                      </Button>
                    </Container>
                  ) : (
                    <div className='loading-container'>
                      <div className='spinner'></div>
                    </div>
                  )}
                </>
              }></Route>
            <Route path=':id' element={<PokemonInfos />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
