import { useState, useEffect } from "react";
import trainers from "../../api/trainers.json";
import { useTranslation } from "react-i18next";
import { List } from "../List/List";
import { useSelector } from "react-redux";

export const Search = ({ pokemonList }) => {
  const [searchedArray, setSearchedArray] = useState("");
  const [searchString, setSearchString] = useState("");
  const { t } = useTranslation("global");

  const { pokemons } = useSelector((state) => {
    return state.pokemons;
  });

  useEffect(() => {
    if (!searchString) {
      setSearchedArray();
    }

    if (searchString) {
      const searchedObjects = [];
      pokemons.forEach((singlePokemon, index) => {
        Object.values(singlePokemon).every((onlyValues, valIndex) => {
          if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
            searchedObjects.push(singlePokemon);
            return;
          }
        });
      });
      setSearchedArray(searchedObjects);
    }
  }, [searchString]);

  return (
    <div className="Search">
      <form action="">
        <label
          htmlFor="site-search"
          className="form-label inline-block mb-2 text-gray-700"
        >
          {t("label.search")}{" "}
        </label>
        <input
          type="search"
          id="search"
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder={t("placeholder.search")}
          className="form-control
        block
        px-3
        py-1.5
        mb-5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </form>
      {searchedArray && <List list={searchedArray} />}
    </div>
  );
};
