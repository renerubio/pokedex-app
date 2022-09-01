import { useEffect, useState } from "react";
import { Card } from "../";
import { useSelector } from "react-redux";

export const List = () => {
  const [pokemonList, setpokemonList] = useState(null);

  const { searchResults } = useSelector((state) => {
    return state.pokemons;
  });

  useEffect(() => {
    if (searchResults) {
      const pokemonListFormated = searchResults.map((pokemon, index) => {
        return (
          index < 20 && <Card key={`pokemon-${pokemon.name}`} data={pokemon} />
        );
      });
      setpokemonList(pokemonListFormated);
    }
  }, [searchResults]);

  return <div className="grid grid-cols-4 gap-4 py-8">{pokemonList}</div>;
};
