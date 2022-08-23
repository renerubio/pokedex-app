import { Search, Loading } from "../";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../../store/pokemonSlice";

export const Pokedex = () => {
  const { t } = useTranslation("global");

  const { loading, pokemons, error } = useSelector((state) => {
    return state.pokemons;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div>
      <h1>{t("header.title")}</h1>
      {loading && <Loading />}
      {!loading && error ? <div>Error: {error}</div> : null}
      {!loading && pokemons.length ? (
        <ul>
          {pokemons.map((pokemonItem) => (
            <li key={pokemonItem.name}>{pokemonItem.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
