export const POKEAPI_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=1154'
export const POKEAPI_POKEMON_LIST_QUERY = JSON.stringify({
    query: `query {
    pokemon_v2_pokemon {
    name
    id
    weight
    height
    base_experience
    order
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
  }`
})

export const POKEAPI_POKEMON_GRAPHQL = 'https://beta.pokeapi.co/graphql/v1beta'
export const POKEAPI_POKEMON_SPRITES =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/'
