import { Link } from "react-router-dom";
import { PokemonDetails } from "../types";
import Pokemon from "./Pokemon";
import { StyledPokemonList } from "./styles/PokemonList.styled";

type Props = { pokemonList: PokemonDetails[] };

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
  return (
    <StyledPokemonList>
      {pokemonList?.map((pokemon, idx: number) => (
        <Link to={`/${pokemon.name}`} key={idx}>
          <Pokemon pokemon={pokemon} />
        </Link>
      ))}
    </StyledPokemonList>
  );
};

export default PokemonList;
