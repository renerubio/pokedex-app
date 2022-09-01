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
    .then((data) => {
      const dataFormated = data.data.pokemon_v2_pokemon.map((pokemonItem) => {
        const { name, pokemon_v2_pokemonsprites, id } = pokemonItem;
        const {
          other: {
            dream_world: { front_default: image },
          },
        } = JSON.parse(pokemon_v2_pokemonsprites[0].sprites);
        return { name, image, id };
      });
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
  },
  reducers: {
    searchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    sortBylowest: (state, action) => {
      state.searchResults = state.searchResults.sort(function (a, b) {
        return a.id - b.id;
      });
    },
    sortByhighest: (state, action) => {
      state.searchResults = state.searchResults.sort(function (a, b) {
        return b.id - a.id;
      });
    },
    sortByAZ: (state, action) => {
      state.searchResults = state.searchResults.sort(function (a, b) {
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
      state.searchResults = state.searchResults.sort(function (a, b) {
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
  searchResults,
  sortBylowest,
  sortByhighest,
  sortByAZ,
  sortByZA,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
