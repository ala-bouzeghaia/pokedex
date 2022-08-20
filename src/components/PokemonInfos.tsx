import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../types";

import {
  StyledPokemonInfos,
  NumberId,
  Bar,
  Arrow,
} from "./styles/PokemonInfos.styled";

const getPokemonDetails = async (id: string): Promise<PokemonDetails> => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.data;
  //console.log("data", data);
  return data;
};
//getPokemonDetails("bulbasaur");

const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.substring(1);
};

const getFormatedId = (id: number) => {
  let str = id.toString();
  while (str.length < 3) {
    str = "0" + str;
  }
  return `#${str}`;
};

const PokemonInfos = () => {
  const params = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
  const [id, setId] = useState(params.id);

  //console.log("params.id =", params.name);
  //getPokemonDetails(params.name).then((res) => console.log("data", res));

  useEffect(() => {
    params.id &&
      getPokemonDetails(params.id).then((res) => {
        setPokemonDetails(res);
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <StyledPokemonInfos
      pokemonType={
        pokemonDetails ? `${pokemonDetails?.types[0].type.name}` : ""
      }
      /* type={`${pokemonD?.types[0].type.name}`} */
      /*style={{
        position: "relative",
        maxWidth: "800px",
        margin: "0 auto",
      }} */
    >
      {pokemonDetails && (
        <>
          <Arrow
            dir='left'
            onClick={() => setId(`${Number(pokemonDetails.id) - 1}`)}>
            <a href={`${Number(pokemonDetails.id) - 1}`}> </a>
          </Arrow>
          <div /* style={{ position: "relative", zIndex: "3" }} */
            className='pokemon-infos-container'>
            <NumberId>{getFormatedId(pokemonDetails.id)}</NumberId>
            <div className='title-container'>
              <div className='title'>
                <div className='type'>
                  {pokemonDetails.types[0].type.name.toUpperCase()}
                </div>
                <h1 className='name'>
                  {capitalizeFirstLetter(pokemonDetails.name)}
                </h1>
                <div className='details'>
                  <div className='row'>
                    <span>Height</span>
                    <span>{`${pokemonDetails.height / 10}M`}</span>
                  </div>
                  <div className='row'>
                    <span>Weight</span>
                    <span>{`${pokemonDetails.weight / 10}KG`}</span>
                  </div>
                  <div className='row'>
                    <span>Abilities</span>
                    <span>
                      {capitalizeFirstLetter(
                        pokemonDetails.abilities[0].ability.name
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <img
                src={
                  pokemonDetails.sprites.other["official-artwork"].front_default
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
          </div>
          <Arrow
            dir='right'
            onClick={() => setId(`${Number(pokemonDetails.id) + 1}`)}>
            {" "}
            <a href={`${Number(pokemonDetails.id) + 1}`}> </a>
          </Arrow>
        </>
      )}
    </StyledPokemonInfos>
  );
};

export default PokemonInfos;
