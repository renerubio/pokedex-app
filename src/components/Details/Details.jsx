import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { backToSearch } from "../../store/pokemonSlice";
import { useTranslation } from "react-i18next";
import { Pills } from "../";

export const Details = () => {
  const { t } = useTranslation("global");
  const [pokemonData, setPokemonData] = useState(null);
  const { pokemonName, searchResults } = useSelector((state) => {
    return state.pokemons;
  });

  const dispatch = useDispatch();

  const getPokemonDetailByName = useMemo(() => {
    const detailData = searchResults.filter((pokemon) => {
      return pokemon.name === pokemonName && pokemon;
    });
    const [pokemonDetail] = detailData;
    return pokemonDetail;
  }, [searchResults, pokemonName]);

  useEffect(() => {
    if (pokemonName) {
      setPokemonData(getPokemonDetailByName);
    }
  }, [pokemonName, getPokemonDetailByName]);

  const handleClick = (e) => {
    dispatch(backToSearch());
  };

  return (
    pokemonData && (
      <div>
        <button
          onClick={handleClick}
          className={
            "bg-gray-200 hover:bg-gray-800 text-gray-800 font-bold py-2 px-4 mx-auto mb-2 border-b-4 border-gray-700 hover:border-gray-500 rounded dark:bg-gray-700 dark:hover:bg-gray-400 dark:text-gray-200 dark:border-gray-900 dark:hover:border-gray-500"
          }
        >
          {t("details.backButton")}
        </button>

        <div
          className={
            "card flex md:flex-row flex-col h-[80vh] md:h-auto p-4 w-full bg-white rounded-lg border-4 border-gray-300 shadow-md dark:bg-gray-600 dark:border-gray-500 "
          }
        >
          <section>
            <img
              src={pokemonData.image}
              alt={pokemonData.name}
              title={pokemonData.name}
              className="pokecursor w-auto md:h-[60vh] md:my-10 md:mx-20
          transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
            />
          </section>
          <section>
            <div className="px-6 py-2 mt-10">
              <h2
                className="text-gray-800 font-bold text-3xl md:text-5xl capitalize
          dark:text-gray-200"
              >
                {`#${pokemonData.id}  ${pokemonData.name}`}
              </h2>
            </div>
            <div className="grid md:grid-cols-1 grid-cols-2">
              <Pills list={pokemonData.types} text={t("details.types")} />
              <Pills
                list={pokemonData.abilities}
                text={t("details.abilities")}
              />
              <Pills list={[pokemonData.height]} text={t("details.height")} />
              <Pills list={[pokemonData.weight]} text={t("details.weight")} />
            </div>
          </section>
        </div>
      </div>
    )
  );
};
