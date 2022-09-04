import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { paginate, searchResults } from "../../store/pokemonSlice";

export const Search = () => {
  const inputSearchRef = useRef(null);
  const [searchString, setSearchString] = useState("");
  const [sampleDone, setSampleDone] = useState(
    localStorage.getItem("sampleDone")
  );
  const { t } = useTranslation("global");

  const { pokemons } = useSelector((state) => {
    return state.pokemons;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setSampleDone(localStorage.getItem("sampleDone"));
    if (!sampleDone) {
      setTimeout(() => setSearchString("p"), 2000);
      setTimeout(() => setSearchString("pi"), 2300);
      setTimeout(() => setSearchString("pik"), 2600);
      setTimeout(() => setSearchString("pikachu"), 3200);
      setTimeout(() => inputSearchRef.current.select(), 3500);
      setTimeout(() => {
        localStorage.setItem("sampleDone", "true");
        setSampleDone(localStorage.getItem("sampleDone"));
      }, 3500);
    }
    if (sampleDone) {
      inputSearchRef.current.focus();
    }
  }, [sampleDone]);

  useEffect(() => {
    if (searchString) {
      const searchedObjects = [];
      pokemons.forEach((singlePokemon, index) => {
        let arrayOfValues = Object.values(singlePokemon);
        let found = arrayOfValues[0].search(searchString.toLowerCase());
        found !== -1 && searchedObjects.push(singlePokemon);
      });
      dispatch(searchResults(searchedObjects));
      dispatch(paginate(1));
    }
  }, [searchString]);

  return (
    <div
      className="Search bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3
    dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200"
    >
      <label
        htmlFor="search"
        className="form-label inline-block text-gray-800 font-bold text-xl capitalize mb-2 dark:text-gray-200 "
      >
        {sampleDone ? (
          t("search.label")
        ) : (
          <b className="text-blue-500 dark:text-blue-900">
            {t("search.howWorks")}
          </b>
        )}
      </label>
      <input
        ref={inputSearchRef}
        type="search"
        id="search"
        name="search"
        value={searchString}
        onChange={(e) => {
          e.preventDefault();
          setSearchString(e.target.value);
        }}
        placeholder={t("search.placeholder")}
        className="form-control
        block
        px-3
        py-1.5
        mb-5
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
      />
    </div>
  );
};
