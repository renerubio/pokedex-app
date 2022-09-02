import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { searchResults } from "../../store/pokemonSlice";

export const Search = () => {
  const [searchString, setSearchString] = useState("");
  const { t } = useTranslation("global");

  const { pokemons } = useSelector((state) => {
    return state.pokemons;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchString) {
      const searchedObjects = [];
      pokemons.forEach((singlePokemon, index) => {
        let arrayOfValues = Object.values(singlePokemon);
        let found = arrayOfValues[0].search(searchString.toLowerCase());
        found != -1 && searchedObjects.push(singlePokemon);
      });
      dispatch(searchResults(searchedObjects));
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
    </div>
  );
};
