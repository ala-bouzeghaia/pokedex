// import { PokemonDetails } from "../types";
import { StyledPokemon } from "./styles/Pokemon.styled";

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

type Props = { pokemon: finalResultType };

const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.substring(1);
};

const Pokemon: React.FC<Props> = ({ pokemon }: Props) => {
  return (
    <StyledPokemon>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <h3>
        #{pokemon.id} {capitalizeFirstLetter(pokemon.name)}
      </h3>
      <div className='types-container'>
        {pokemon.types.map((elt, idx: number) => (
          <p key={idx}>{elt.type.name}</p>
        ))}
      </div>
    </StyledPokemon>
  );
};

export default Pokemon;
