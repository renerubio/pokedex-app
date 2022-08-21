import { useEffect, useState } from "react";

export const List = ({ list } = null) => {
  const [pokemonList, setpokemonList] = useState(null);
  useEffect(() => {
    if (list?.results) {
      const pokemonListFormated = list.results.map((pokemon) => (
        <li key={`pokemon-${pokemon.name}`}>{pokemon.name}</li>
      ));
      setpokemonList(pokemonListFormated);
    }
  }, [list]);

  return (
    <div>
      <h2>Results</h2>
      {<ul>{pokemonList}</ul>}
    </div>
  );
};
