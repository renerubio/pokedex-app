import { useSelector, useDispatch } from "react-redux";
import { paginate } from "../../store/pokemonSlice";
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

  return (
    <div className="py-2 justify-self-end">
      <div>
        <p className="text-sm text-gray-700 mr-2 mb-2">
          {t("pagination.showing")}
          <span className="font-medium">{` ${showing} `}</span>
          {t("pagination.to")}
          <span className="font-medium">{` ${to} `}</span>
          {t("pagination.of")}
          <span className="font-medium"> {totalPokemons} </span>
          {t("pagination.results")}
        </p>
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
