import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  POKEAPI_POKEMON_GRAPHQL,
  POKEAPI_POKEMON_LIST_QUERY
} from '../api/endpoints'

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', () => {
  if (localStorage.getItem('pokemonGraphQlData') === null) {
    return fetch(POKEAPI_POKEMON_GRAPHQL, {
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: POKEAPI_POKEMON_LIST_QUERY,
      method: 'POST'
    })
      .then(response => response.json())
      .then(responseJson => {
        const dataFormated = responseJson.data.pokemon_v2_pokemon.map(
          pokemonItem => {
            const {
              name,
              id,
              weight,
              height,
              base_experience,
              order,
              pokemon_v2_pokemontypes,
              pokemon_v2_pokemonabilities,
              pokemon_v2_pokemonsprites
            } = pokemonItem

            const {
              front_default: front_default_image,
              other: {
                dream_world: { front_default: dream_world_image },
                home: { front_default: home_image }
              }
            } = JSON.parse(pokemon_v2_pokemonsprites[0].sprites)

            let types = pokemon_v2_pokemontypes.map(types => {
              return types.pokemon_v2_type?.name
            })

            let abilities = pokemon_v2_pokemonabilities.map(abilities => {
              return abilities.pokemon_v2_ability?.name
            })

            const image = dream_world_image
              ? dream_world_image
              : home_image
              ? home_image
              : front_default_image

            return {
              name,
              id,
              weight,
              height,
              base_experience,
              order,
              abilities,
              types,
              image
            }
          }
        )
        const dataFiltered = dataFormated.filter(
          pokemonData => pokemonData.image != null
        )
        localStorage.setItem('pokemonGraphQlData', JSON.stringify(dataFiltered))
        return dataFiltered
      })
  } else {
    return JSON.parse(localStorage.getItem('pokemonGraphQlData'))
  }
})

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonName: '',
    loading: false,
    pokemons: [],
    error: '',
    searchResults: [],
    pokemonsPerPage: 20,
    totalPokemons: 0,
    currentPage: 1,
    resultsByPage: []
  },
  reducers: {
    backToSearch: state => {
      state.pokemonName = []
    },
    pokemonName: (state, action) => {
      state.pokemonName = action.payload
    },
    setPokemonsPerPage: (state, action) => {
      state.pokemonsPerPage = action.payload
    },
    paginate: (state, action) => {
      const start =
        action.payload === 1 ? 0 : (action.payload - 1) * state.pokemonsPerPage
      const end = start + state.pokemonsPerPage
      let searchResultsCopy = [...state.searchResults]
      state.resultsByPage = searchResultsCopy.slice(start, end)
      state.currentPage = action.payload
    },
    searchResults: (state, action) => {
      state.searchResults = action.payload
      state.totalPokemons = action.payload.length
    },
    sortBylowest: state => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        return a.id - b.id
      })
    },
    sortByhighest: state => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        return b.id - a.id
      })
    },
    sortByAZ: state => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })
    },
    sortByZA: state => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        if (a.name < b.name) {
          return 1
        }
        if (a.name > b.name) {
          return -1
        }
        return 0
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPokemons.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = false
      state.pokemons = []
      state.error = action.error.message
    })
  }
})

export const {
  backToSearch,
  pokemonName,
  setPokemonsPerPage,
  paginate,
  resultsByPage,
  searchResults,
  sortBylowest,
  sortByhighest,
  sortByAZ,
  sortByZA,
  pokemons
} = pokemonSlice.actions
export default pokemonSlice.reducer
