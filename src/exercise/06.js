// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonForm, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [pokemon, setPokemon ] = React.useState(null)



  
// this is the state of the world that we want to syncronise with the state of our application 
//in our case the state of the world is the fetch request to fetch a pokemon.
// this useEffectg will happen on every rerender of our component, or also in the first loading of the page, so, at the beginning, the pokemon variable is null, so we also have to write a condition for what.. so that it exits before fetching. 
React.useEffect(() => {
  if (!pokemonName) {
    return
  }
  fetchPokemon(pokemonName).then(pokemonData => {
    setPokemon(pokemonData)
  })
},[pokemonName])


  // if there is no pokemon, then show a message saying chose a pokemon 
if (!pokemonName) {
  return ("Submit a Pokemon")
} else if (!pokemon) {
  return <PokemonInfoFallback name={pokemonName}/> // we have a pokemon name, but no pokemon, so for example that pokemon doesnt exist in the API; this fallback is just a component that we imported 
} else {
  return <PokemonDataView pokemon={pokemon}/> // also a component
}



  // return (
  //   <div>
  //   {result.data}
  //   </div>
  // )

  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  return 'TODO'
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  // const [pokemon, setPokemon] = React.useState(null)


  

   function handleSubmit(newPokemonName) {
     setPokemonName(newPokemonName)
  //   setPokemon(pokemonName)
   }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
