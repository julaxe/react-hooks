// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
 
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') || initialName
    )
  // we declare an array as a second argument so we tell to useEffect when to update, in this case
  // we are telling useEffect that only updates when the variable 'name' is changed.
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

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
  return <Greeting initialName = "Julian" />
}

export default App
