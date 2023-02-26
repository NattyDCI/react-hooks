// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonForm, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {  
  

const [state, setState] = React.useState({
  status: "idle",
  pokemon: "null",
  error:"null"
})

const {status, pokemon, error} = state

//changes7

// this is the state of the world that we want to syncronise with the state of our application 
//in our case the state of the world is the fetch request to fetch a pokemon.
// this useEffectg will happen on every rerender of our component, or also in the first loading of the page, so, at the beginning, the pokemon variable is null, so we also have to write a condition for what.. so that it exits before fetching. 
React.useEffect(() => {
  if (!pokemonName) {
    return
  }
  setState({status:"pending"})
  fetchPokemon(pokemonName).then(
    pokemon => { 
      setState({status:"resolved", pokemon})
     
    }, 
    error => { 
      setState({error, status:"rejected"})
    }
  )
}, [pokemonName])

if (status === "idle") {
  return ("Submit a Pokemon")
}
else if (status === "pending") {
  return <PokemonInfoFallback name={pokemonName}/> // we have a pokemon name, but no pokemon, so for example that pokemon doesnt exist in the API; this fallback is just a component that we imported 
   
} else if (status === "rejected") {
  return (
  <div role="alert">
  There was an error: 
  <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
</div>)
} else if (status === "resolved") {
  return <PokemonDataView pokemon={pokemon}/> // also a component
}
 throw new Error (`this should be impossible`)
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
