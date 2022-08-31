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
      <h2 className="text-gray-800 font-bold text-xl capitalize">Results</h2>
      {<div className="grid grid-cols-4 gap-4">{pokemonList}</div>}
    </div>
  );
};
