// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key, 
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
  const [state, setState] = React.useState( () => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if(valueInLocalStorage){
      try{
        return deserialize(valueInLocalStorage)
      }catch(err){
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if(prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]

}

function Greeting({initialName = ''}) {
 
  const [name, setName] = useLocalStorageState('name', initialName)
  const [middleName, setMiddleName] = useLocalStorageState('middleName')

  function handleChange1(event) {
    setName(event.target.value)
  }
  function handleChange2(event) {
    setMiddleName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange1} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      <form>
        <label htmlFor="middleName">Middle Name: </label>
        <input value={middleName} onChange={handleChange2} id="middleName" />
      </form>
      {middleName ? <strong>Hello {middleName}</strong> : 'Please type your middleName'}
    </div>
  )
}

function App() {
  return <Greeting initialName = "Julian" />
}

export default App
