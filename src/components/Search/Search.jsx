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
    <div className="Search">
      <label
        htmlFor="search"
        className="form-label inline-block mb-2 text-gray-700"
      >
        {sampleDone ? (
          <b>{t("search.label")}</b>
        ) : (
          <b className="text-blue-700">{t("search.howWorks")}</b>
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
    </div>
  );
};
