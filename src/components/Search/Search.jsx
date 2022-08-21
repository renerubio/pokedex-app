import { useState, useEffect } from "react";
import trainers from "../../api/trainers.json";
import { useTranslation } from "react-i18next";

export const Search = () => {
  const [searchedArray, setSearchedArray] = useState("");
  const [searchString, setSearchString] = useState("");
  const { t } = useTranslation("global");

  useEffect(() => {
    if (!searchString) {
      setSearchedArray();
    }
    if (searchString) {
      const searchedObjects = [];
      trainers.forEach((singleTrainerObj, index) => {
        Object.values(singleTrainerObj).every((onlyValues, valIndex) => {
          if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
            searchedObjects.push(singleTrainerObj);
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
        <label htmlFor="site-search">{t("label.search")} </label>
        <input
          type="search"
          id="search"
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder={t("placeholder.search")}
        />
        <pre>{JSON.stringify(searchedArray, null, "    ")}</pre>
      </form>
    </div>
  );
};
