import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  sortBylowest,
  sortByhighest,
  sortByAZ,
  sortByZA,
} from "../../store/pokemonSlice";

export const Sort = () => {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();

  const buttonClass =
    "bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 mr-2 border-b-4 border-gray-700 hover:border-gray-500 rounded";

  return (
    <div>
      <h2 className="text-gray-800 font-bold text-xl capitalize">
        {t("sort.title")}
      </h2>
      <button onClick={() => dispatch(sortBylowest())} className={buttonClass}>
        {t("sort.lowest")}
      </button>
      <button onClick={() => dispatch(sortByhighest())} className={buttonClass}>
        {t("sort.highest")}
      </button>
      <button onClick={() => dispatch(sortByAZ())} className={buttonClass}>
        {t("sort.A-Z")}
      </button>
      <button onClick={() => dispatch(sortByZA())} className={buttonClass}>
        {t("sort.Z-A")}
      </button>
    </div>
  );
};
