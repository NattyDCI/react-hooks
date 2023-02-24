// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()

  const tiltRef = React.useRef() // useRef creates an object and has a property .current



// everytime you need to interact with the node, that interaction is a side effect, so for that we need useEffect 
  React.useEffect(()=>{
    const tiltNode = tiltRef.current
    VanillaTilt.init(tiltNode, {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
   })
   return () => tiltNode.vanillaTilt.destroy() // clean up function, because if you one day decide to erase the tiltNode, the dom nodes will stay there hanging around 
   // so you want to clean them

  }, []) // I dont need to rerender this everytime the component rerenders, It just needs to happen once when its mounted and cleaned up when its unmonted.


  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  // 💰 like this:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  //
  // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
  // object to your DOM node to cleanup:
  // `return () => tiltNode.vanillaTilt.destroy()`
  //
  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  // 🐨 add the `ref` prop to the `tilt-root` div here:
  return (
    <div ref = {tiltRef}  className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
