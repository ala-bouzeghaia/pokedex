export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonTypes {
  type: {
    name: string;
  };
}

export interface PokemonAbilities {
  ability: { name: string };
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  abilities: [{ ability: { name: string } }];
  weight: number;
  height: number;
  stats: [{ base_stat: number; stat: { name: string } }];
}
