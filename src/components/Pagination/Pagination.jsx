import { useSelector, useDispatch } from "react-redux";
import { paginate, setPokemonsPerPage } from "../../store/pokemonSlice";
import { useTranslation } from "react-i18next";

export const Pagination = () => {
  const { t } = useTranslation("global");

  const dispatch = useDispatch();
  const { pokemonsPerPage, totalPokemons, currentPage } = useSelector(
    (state) => {
      return state.pokemons;
    }
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const showing = currentPage * pokemonsPerPage - (pokemonsPerPage - 1);
  const to =
    currentPage === pageNumbers.at(-1)
      ? totalPokemons
      : currentPage * pokemonsPerPage;
  /**
   * handlePokemonsPerPage
   * TODOs
   * dispach(paginate(param)) -> param shoud be dinamic
   */
  const handlePokemonsPerPage = (e) => {
    const {
      target: { value },
    } = e;
    if (value > 0 && value <= totalPokemons) {
      dispatch(setPokemonsPerPage(e.target.value));
      dispatch(paginate(1));
    }
  };

  return (
    <div className="py-2 justify-self-end">
      <div className="my-2">
        <span className="text-sm font-medium text-gray-700">
          {`${t("pagination.showing")} ${showing} 
            ${t("pagination.to")} ${to} 
            ${t("pagination.of")} ${totalPokemons} 
            ${t("pagination.results")} `}
        </span>
      </div>
      <div className="mb-2">
        <label
          htmlFor="pokemonsPerPage"
          className="text-sm font-medium text-gray-700"
        >
          {`${t("pagination.resultsPerPage")}   `}
        </label>
        <input
          name="pokemonsPerPage"
          type="number"
          value={pokemonsPerPage}
          className="w-16  pl-2 py-1 border border-b-4 border-gray-700 
          hover:bg-gray-200 hover:border-gray-300 rounded"
          onChange={(e) => {
            handlePokemonsPerPage(e);
          }}
        />
      </div>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => dispatch(paginate(number))}
                className={
                  currentPage === number
                    ? "bg-gray-500 text-white hover:bg-gray-400 relative inline-flex items-center px-4 py-2 border text-sm font-medium border-b-4 border-gray-700 hover:border-gray-500 rounded"
                    : "bg-white text-gray-400 hover:bg-gray-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium border-b-4 border-gray-700 hover:border-gray-500 rounded"
                }
              >
                {number}
              </button>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};
