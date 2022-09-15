import { Link } from "react-router-dom";
// import { PokemonDetails } from "../types";
import Pokemon from "./Pokemon";
import { StyledPokemonList } from "./styles/PokemonList.styled";

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

type Props = { pokemonList: finalResultType[] };

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
  return (
    <StyledPokemonList>
      {pokemonList?.map((pokemon, idx: number) => (
        <Link to={`/${pokemon.id}`} key={idx}>
          <Pokemon pokemon={pokemon} />
        </Link>
      ))}
    </StyledPokemonList>
  );
};

export default PokemonList;
