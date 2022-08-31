export const POKEAPI_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=1154";
export const POKEAPI_POKEMON_LIST_QUERY = JSON.stringify({
  query: `query {
    pokemon_v2_pokemon {
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      id
    }
  }`,
});
export const POKEAPI_POKEMON_DETAIL_QUERY = (namePokemon) => {
  return JSON.stringify({
    query: `query {
    pokemon(name: $namePokemon) {
      name
      sprites {
        front_default
      }
    }
  }`,
    variables: `{
    "name": "${namePokemon}"
  }`,
  });
};
export const POKEAPI_POKEMON_GRAPHQL = "https://beta.pokeapi.co/graphql/v1beta";
