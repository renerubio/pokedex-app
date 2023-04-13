import { Search, Loading, List, Sort, Pagination, Details } from '../'
import { useTranslation } from 'react-i18next'
import { useEffect, useContext } from 'react'
import { ThemeContext } from '../../context/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from '../../store/pokemonSlice'

export const Pokedex = () => {
  const { t } = useTranslation('global')

  const { loading, pokemons, error, searchResults, pokemonName } = useSelector(
    state => {
      return state.pokemons
    }
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [])

  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={`${theme} md:p-9 p-5 h-min-[110vh] h-full`}>
      <nav className='flex justify-between items-center'>
        <h1 className='title font-bold text-3xl uppercase mb-5 dark:text-gray-200 '>
          {t('header.title')}
        </h1>
        <button
          onClick={() => toggleTheme()}
          className='button rounded-full p-2'
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      {loading && <Loading />}
      {!loading && error && <div>Error: {error}</div>}

      {!loading && pokemons.length && pokemonName.length === 0 && (
        <>
          <div className='grid md:grid-cols-2 sm:grid-cols-1'>
            <Search />
            <Sort />
          </div>
          <Pagination />
        </>
      )}
      {searchResults.length > 0 && pokemonName.length === 0 && <List />}
      {pokemonName.length > 0 && <Details />}
    </div>
  )
}
