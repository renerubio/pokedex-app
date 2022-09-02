import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  POKEAPI_POKEMON_GRAPHQL,
  POKEAPI_POKEMON_LIST_QUERY,
  POKEAPI_POKEMON_DETAIL_QUERY,
} from "../api/endpoints";

export const fetchPokemonDetail = createAsyncThunk(
  "pokemons/fetchPokemonDetail",
  () => {
    return fetch(POKEAPI_POKEMON_GRAPHQL, {
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: POKEAPI_POKEMON_DETAIL_QUERY("charizard"),
      method: "POST",
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
        return data;
      });
  }
);

export const fetchPokemons = createAsyncThunk("pokemons/fetchPokemons", () => {
  return fetch(POKEAPI_POKEMON_GRAPHQL, {
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: POKEAPI_POKEMON_LIST_QUERY,
    method: "POST",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      const dataFormated = responseJson.data.pokemon_v2_pokemon.map(
        (pokemonItem) => {
          const {
            name,
            pokemon_v2_pokemonsprites,
            id,
            pokemon_v2_pokemontypes,
          } = pokemonItem;

          const {
            other: {
              dream_world: { front_default: image },
            },
          } = JSON.parse(pokemon_v2_pokemonsprites[0].sprites);

          let types = [];
          switch (pokemon_v2_pokemontypes.length) {
            case 1:
              types.push(pokemon_v2_pokemontypes[0].pokemon_v2_type.name);
              break;
            case 2:
              types.push(pokemon_v2_pokemontypes[0].pokemon_v2_type.name);
              types.push(pokemon_v2_pokemontypes[1].pokemon_v2_type.name);
              break;
          }

          return { name, image, id, types };
        }
      );
      return dataFormated.filter((pokemonData) => pokemonData.image != null);
    });
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    loading: false,
    pokemons: [],
    error: "",
    searchResults: [],
    pokemonsPerPage: 10,
    totalPokemons: 0,
    currentPage: 1,
    resultsByPage: [],
  },
  reducers: {
    paginate: (state, action) => {
      const start =
        action.payload === 1 ? 0 : (action.payload - 1) * state.pokemonsPerPage;
      const end = start + state.pokemonsPerPage;
      let searchResultsCopy = [...state.searchResults];
      state.resultsByPage = searchResultsCopy.slice(start, end);
      state.currentPage = action.payload;
    },
    searchResults: (state, action) => {
      state.searchResults = action.payload;
      state.totalPokemons = action.payload.length;
    },
    sortBylowest: (state, action) => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    sortByhighest: (state, action) => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        return b.id - a.id;
      });
    },
    sortByAZ: (state, action) => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
    sortByZA: (state, action) => {
      state.resultsByPage = state.resultsByPage.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = false;
      state.pokemons = [];
      state.error = action.error.message;
    });
  },
});

export const {
  paginate,
  resultsByPage,
  searchResults,
  sortBylowest,
  sortByhighest,
  sortByAZ,
  sortByZA,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
