import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../types";

const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.data;
  //console.log("data", data);
  return data;
};

const Pokepoke: React.FC = () => {
  const [poke, setPoke] = useState<PokemonDetails>();
  const params = useParams();

  useEffect(() => {
    params.name && getPokemonDetails(params.name).then((res) => setPoke(res));
  }, []);

  return (
    <div>
      {poke ? (
        <>
          <h3>{poke?.name}</h3>
          <img src={poke.sprites.other["official-artwork"].front_default} />
        </>
      ) : (
        <h3>No poke</h3>
      )}
    </div>
  );
};

export default Pokepoke;
