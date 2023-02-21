// useEffect: persistent state
// 💯 custom hook
// http://localhost:3000/isolated/final/02.extra-3.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
} // custom hook

//ask moritz about this, where is this initialName coming from.. is it on line 22 destructuring name and setname from the state and setState of the useLocalStorange component and reassigning those names or what?

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}
function App() {
  return <Greeting />
}

export default App

