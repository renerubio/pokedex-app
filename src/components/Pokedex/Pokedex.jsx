import { Search, Loading, List, Sort } from "../";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../../store/pokemonSlice";

export const Pokedex = () => {
  const { t } = useTranslation("global");

  const { loading, pokemons, error, searchResults } = useSelector((state) => {
    return state.pokemons;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div className="p-9">
      <h1 className="text-gray-900 font-bold text-3xl uppercase mb-5">
        {t("header.title")}
      </h1>
      {loading && <Loading />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && pokemons.length ? <Search /> : null}
      {!loading && searchResults.length ? <Sort /> : null}
      {!loading && searchResults.length ? <List /> : null}
    </div>
  );
};
