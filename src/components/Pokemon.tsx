import { PokemonDetails } from "../types";
import { StyledPokemon } from "./styles/Pokemon.styled";

type Props = { pokemon: PokemonDetails };

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
