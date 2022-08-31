import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice, { pokemonListFormated } from "./pokemonSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonSlice,
  },
});

export default store;
