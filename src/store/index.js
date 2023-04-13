import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './pokemonSlice'

const store = configureStore({
    reducer: {
        pokemons: pokemonSlice
    }
})

export default store
