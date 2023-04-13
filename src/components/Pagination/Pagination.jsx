import { useSelector, useDispatch } from 'react-redux'
import { paginate, setPokemonsPerPage } from '../../store/pokemonSlice'
import { useTranslation } from 'react-i18next'

export const Pagination = () => {
    const { t } = useTranslation('global')

    const dispatch = useDispatch()
    const { pokemonsPerPage, totalPokemons, currentPage } = useSelector(
        state => {
            return state.pokemons
        }
    )

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    const showing = currentPage * pokemonsPerPage - (pokemonsPerPage - 1)
    const to =
        currentPage === pageNumbers.at(-1)
            ? totalPokemons
            : currentPage * pokemonsPerPage
    /**
     * handlePokemonsPerPage
     * TODOs
     * dispach(paginate(param)) -> param shoud be dinamic
     */
    const handlePokemonsPerPage = e => {
        const {
            target: { value }
        } = e
        if (value > 0 && value <= totalPokemons) {
            dispatch(setPokemonsPerPage(e.target.value))
            dispatch(paginate(1))
        }
    }

    return (
        <div className='py-2 justify-self-end'>
            <div className='my-2'>
                <span className='text-sm font-medium dark:text-gray-300 text-gray-700'>
                    {`${t('pagination.showing')} ${showing} 
            ${t('pagination.to')} ${to} 
            ${t('pagination.of')} ${totalPokemons} 
            ${t('pagination.results')} `}
                </span>
            </div>
            <div className='mb-2'>
                <label
                    htmlFor='pokemonsPerPage'
                    className='text-sm font-medium dark:text-gray-200 text-gray-700'
                >
                    {`${t('pagination.resultsPerPage')}   `}
                </label>
                <input
                    name='pokemonsPerPage'
                    type='number'
                    value={pokemonsPerPage}
                    className='w-16 pl-2 py-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500'
                    onChange={e => {
                        handlePokemonsPerPage(e)
                    }}
                />
            </div>
            <nav className='block'>
                <ul className='flex pl-0 rounded list-none flex-wrap'>
                    <li>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => dispatch(paginate(number))}
                                className={
                                    currentPage === number
                                        ? 'text-white mr-1 mb-1 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm md:w-auto sm:w-[40px] px-5 py-2.5 text-center dark:text-gray-200 dark:bg-gray-400 '
                                        : 'text-white mr-1 mb-1 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm md:w-auto sm:w-[40px] px-5 py-2.5 text-center dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-400 dark:focus:ring-gray-800'
                                }
                            >
                                {number}
                            </button>
                        ))}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
