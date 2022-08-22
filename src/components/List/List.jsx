import { useEffect, useState } from "react";
import { Card } from "../";

export const List = ({ list } = null) => {
  const [pokemonList, setpokemonList] = useState(null);
  useEffect(() => {
    if (list) {
      const pokemonListFormated = list.map((pokemon, index) => {
        return (
          index < 20 && <Card key={`pokemon-${pokemon.name}`} data={pokemon} />
        );
      });
      setpokemonList(pokemonListFormated);
    }
  }, [list]);

  return (
    <div>
      <h2>Results</h2>
      {pokemonList}
    </div>
  );
};
