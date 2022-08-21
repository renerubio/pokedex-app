import { Search, List } from "../";
import { useFetch } from "../../hooks";
import { POKEAPI_POKEMON } from "../../api/endpoints";
import { Loading } from "../Loading/Loading";
import { useTranslation } from "react-i18next";

export const Pokedex = () => {
  const { t } = useTranslation("global");
  const { loading, response, error } = useFetch(POKEAPI_POKEMON);

  return (
    <div>
      <h1>{t("header.title")}</h1>
      {loading ? <Loading /> : <Search />}
      {loading ? error : <List list={response} />}
    </div>
  );
};
