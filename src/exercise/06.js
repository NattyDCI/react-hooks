
import * as React from "react"
import {fetchPokemon, PokemonForm, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import { ErrorBoundary, resetErrorBoundary } from "react-error-boundary"

function PokemonInfo({pokemonName}) {  
  const [state, setState] = React.useState({
  status: pokemonName ? "pending" : "idle",
  pokemon: "null",
  error:"null"
})

const {status, pokemon, error} = state

//changes6

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
  
  throw error 
  
} else if (status === "resolved") {
  return <PokemonDataView pokemon={pokemon}/> // also a component
}
 throw new Error (`this should be impossible`)
}
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div>
      There was an console.error;
      <pre style ={{whiteSpace:"normal"}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}


function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  // const [pokemon, setPokemon] = React.useState(null)

  

   function handleSubmit(newPokemonName) {
     setPokemonName(newPokemonName)
  //   setPokemon(pokemonName)
   }

   
function handleReset() {
  setPokemonName(" ")
}

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[]}>
        <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App