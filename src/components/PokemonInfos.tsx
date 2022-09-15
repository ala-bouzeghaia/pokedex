import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import { PokemonDetails } from "../types";
import Navbar from "./Navbar";

import {
  StyledPokemonInfos,
  NumberId,
  Bar,
  Arrow,
} from "./styles/PokemonInfos.styled";
import { useLanguage } from "./LanguageContext";

type pokemonType = {
  type: {
    name: string;
  };
};
type pokemonAbility = {
  ability: {
    name: string;
  };
};
type pokemonStat = {
  base_stat: number;
  stat: { name: string };
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
  abilities: pokemonAbility[];
  weight: number;
  height: number;
  stats: pokemonStat[];
};
const getPokemonDetails = async (id: string, language: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.data;
  console.log("data", data);

  // const finalResults = {};
  const dataId = await data.id;
  const dataSprites = await data.sprites;
  const resName = await axios.get(data.species.url);
  const dataName = await resName.data.names.filter(
    (elt: { language: { name: string } }) => elt.language.name === language
  )[0].name;
  const dataWeight = await data.weight;
  const dataHeight = await data.height;

  const typesList = await data.types;
  const dataTypes: pokemonType[] = [];
  for (let i = 0; i < typesList.length; i++) {
    const resType = await axios.get(typesList[i].type.url);

    const typeName: string = await resType.data.names.filter(
      (elt: { language: { name: string } }) => elt.language.name === language
    )[0].name;
    const type = { name: typeName };
    // console.log(type);
    dataTypes.push({ type });
  }

  const abilitiesList = await data.abilities;
  const dataAbilities: pokemonAbility[] = [];
  for (let i = 0; i < abilitiesList.length; i++) {
    const resAbility = await axios.get(abilitiesList[i].ability.url);

    const abilityName: string = await resAbility.data.names.filter(
      (elt: { language: { name: string } }) => elt.language.name === language
    )[0].name;
    const ability = { name: abilityName };
    // console.log(type);
    dataAbilities.push({ ability });
  }

  const statsList = await data.stats;
  const dataStats: pokemonStat[] = [];
  for (let i = 0; i < statsList.length; i++) {
    const resStat = await axios.get(statsList[i].stat.url);
    const statName: string = await resStat.data.names.filter(
      (elt: { language: { name: string } }) => elt.language.name === language
    )[0].name;
    const stat = { name: statName };
    dataStats.push({ base_stat: statsList[i].base_stat, stat });
  }
  const finalResults: finalResultType = {
    id: dataId,
    name: dataName,
    sprites: dataSprites,
    types: dataTypes,
    weight: dataWeight,
    height: dataHeight,
    stats: dataStats,
    abilities: dataAbilities,
  };
  console.log("finalResults", finalResults);
  return { data, finalResults };
};
//getPokemonDetails("bulbasaur");

const getFormatedId = (id: number) => {
  let str = id.toString();
  while (str.length < 3) {
    str = "0" + str;
  }
  return `#${str}`;
};

// const animations = {
//   initial: { opacity: 1, y: 300 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 1, y: -300 },
// };

const PokemonInfos = () => {
  const params = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<finalResultType>();
  const [id, setId] = useState(params.id as string);
  const [loading, setLoading] = useState(true);
  const cachedBackgroundColor = sessionStorage.getItem("color");
  console.log("cached", cachedBackgroundColor);
  const { language } = useLanguage();

  //console.log("params.id =", params.name);
  //getPokemonDetails(params.name).then((res) => console.log("data", res));
  console.log(loading);

  useEffect(() => {
    getPokemonDetails(id, language).then((res) => {
      setPokemonDetails(res.finalResults);
      setLoading(false);
      sessionStorage.setItem(
        "color",
        `${res.data.types[0].type.name.toLowerCase()}`
      );
    });
  }, [id, language]);

  return (
    <StyledPokemonInfos
      pokemonType={cachedBackgroundColor ? `${cachedBackgroundColor}` : ""}>
      <Navbar />
      {pokemonDetails && (
        <div className='pokemon-infos'>
          <Arrow
            dir='left'
            onClick={() => {
              setId(`${pokemonDetails.id - 1}`);
              setLoading(true);
            }}>
            <Link to={`/${pokemonDetails.id > 1 ? pokemonDetails.id - 1 : ""}`}>
              {" "}
            </Link>
          </Arrow>
          <NumberId>{getFormatedId(Number(id))}</NumberId>
          <AnimatePresence mode='wait'>
            <motion.div
              key={pokemonDetails.id}
              className='pokemon-infos-container'
              // variants={animations}
              // initial='initial'
              // animate='animate'
              // exit='exit'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              // initial={{ opacity: 0, y: 300 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{
                // y: { duration: 1.5 },
                // repeatType: "reverse",
                opacity: { duration: 1.2 },
                y: { duration: 1.2 },
              }}>
              <div className='title-container'>
                <div className='title'>
                  <div className='type'>
                    {pokemonDetails.types[0].type.name.toUpperCase()}
                  </div>
                  <h1 className='name'>{pokemonDetails.name}</h1>
                  <div className='details'>
                    <div className='row'>
                      <span>{language === "en" ? "Height" : "Taille"}</span>
                      <span>{`${pokemonDetails.height / 10}M`}</span>
                    </div>
                    <div className='row'>
                      <span>{language === "en" ? "Weight" : "Poids"}</span>
                      <span>{`${pokemonDetails.weight / 10}KG`}</span>
                    </div>
                    <div className='row'>
                      <span>
                        {language === "en" ? "Abilities" : "Capacités"}
                      </span>
                      <span>{pokemonDetails.abilities[0].ability.name}</span>
                    </div>
                  </div>
                </div>

                <img
                  src={
                    pokemonDetails.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={pokemonDetails.name}
                />
              </div>

              <div className='stats-container'>
                <h3>Stats</h3>
                <div className='stats'>
                  {pokemonDetails.stats.map((elt, idx: number) => (
                    <div key={idx} className='stats-row'>
                      <span>{elt.stat.name}</span>
                      <div className='base-stat'>
                        <Bar w={elt.base_stat}></Bar>
                        <span>{elt.base_stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <Arrow
            dir='right'
            onClick={() => {
              setId(`${Number(pokemonDetails.id) + 1}`);
              setLoading(true);
            }}>
            {" "}
            <Link to={`/${pokemonDetails.id + 1}`}> </Link>
          </Arrow>
        </div>
      )}
    </StyledPokemonInfos>
  );
};

export default PokemonInfos;
