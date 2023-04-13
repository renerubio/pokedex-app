import { useEffect, useState } from 'react'
import { Card } from '../'
import { useSelector, useDispatch } from 'react-redux'
import { paginate } from '../../store/pokemonSlice'

export const List = () => {
  const [pokemonList, setpokemonList] = useState(null)

  const { searchResults, pokemonsPerPage, resultsByPage } = useSelector(
    state => {
      return state.pokemons
    }
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (searchResults) {
      dispatch(paginate(1))
    }
  }, [searchResults])

  useEffect(() => {
    if (resultsByPage) {
      const pokemonListFormated = resultsByPage.map((pokemon, index) => {
        return (
          index < pokemonsPerPage && (
            <Card key={`pokemon-${pokemon.name}`} data={pokemon} />
          )
        )
      })
      setpokemonList(pokemonListFormated)
    }
  }, [resultsByPage, searchResults])

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-8'>
      {pokemonList}
    </div>
  )
}
