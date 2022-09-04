import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import colorByType from "../../utils/colorByType";
import { backToSearch } from "../../store/pokemonSlice";

export const Details = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { pokemonName, searchResults } = useSelector((state) => {
    return state.pokemons;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonName) {
      const detailData = searchResults.filter((pokemon, index) => {
        return pokemon.name === pokemonName && pokemon;
      });
      const [pokemonDetail] = detailData;
      setPokemonData(pokemonDetail);
    }
  }, [pokemonName]);

  const handleClick = (e) => {
    dispatch(backToSearch());
  };

  return (
    pokemonData && (
      <div>
        <button
          onClick={handleClick}
          className={
            "bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 mx-auto mb-2 border-b-4 border-gray-700 hover:border-gray-500 rounded"
          }
        >
          Back
        </button>

        <div
          className={
            "card h-auto p-4 max-w-lg bg-white rounded-lg border-4 border-gray-300 shadow-md dark:bg-gray-100 dark:border-gray-200 "
          }
        >
          <img
            src={pokemonData.image}
            alt={pokemonData.name}
            title={pokemonData.name}
            className="pokecursor w-auto h-[70%] mx-[auto] mt-1
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
          />
          <div className="px-6 py-2 first-letter:h-[15%]">
            <h2 className="text-gray-800 font-bold text-xl capitalize">
              {`#${pokemonData.id}  ${pokemonData.name}`}
            </h2>
          </div>
          <div className=" px-6 pt-2 h-[15%]">
            <h3 className="text-gray-800 font-bold text-l capitalize">
              Types:
            </h3>
            {pokemonData.types.map((type, index) => (
              <div
                key={`${type}_${index}`}
                className={`${colorByType(
                  type,
                  "bg"
                )} border-gray-700 border-2 inline-block rounded-lg px-3 py-1 text-sm font-bold text-gray-900 mr-2 mt-1`}
              >
                {type}
              </div>
            ))}
          </div>
          <div className=" px-6 pt-2 h-[15%]">
            <h3 className="text-gray-800 font-bold text-l capitalize">
              Abilities:
            </h3>
            {pokemonData.abilities.map((ability, index) => (
              <div
                key={`${ability}_${index}`}
                className={`bg-gray-700 border-gray-900 border-2 inline-block rounded-lg px-3 py-1 text-sm font-bold text-gray-100 mr-2 mt-1`}
              >
                {ability}
              </div>
            ))}
          </div>
          <div className=" px-6 pt-2 h-[15%]">
            <h3 className="text-gray-800 font-bold text-l capitalize">Size:</h3>
            <div
              className={`bg-gray-700 border-gray-900 border-2 inline-block rounded-lg px-3 py-1 text-sm font-bold text-gray-100 mr-2 mt-1`}
            >
              {`Height: ${pokemonData.height}`}
            </div>
            <div
              className={`bg-gray-700 border-gray-900 border-2 inline-block rounded-lg px-3 py-1 text-sm font-bold text-gray-100 mr-2 mt-1`}
            >
              {`Weight: ${pokemonData.weight}`}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
