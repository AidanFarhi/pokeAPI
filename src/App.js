import React, { useState, useEffect} from 'react'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    pokemon: [],
    displayPoke: false,
    pokeToDisplay: null
  })

  const getData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      const data = await response.json()
      const pokeData = data.results.map(p => <li onClick={()=> getPoke(p.url)}>{p.name}</li>)
      setState({pokemon: pokeData, isLoading: false})
    } catch(er) {
      console.log(er)
    }
  }

  const getPoke = async (url) => {
    try {
      const response = await fetch(`${url}`)
      const data = await response.json()
      const response2 = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      const data2 = await response2.json()
      const pokeData = data2.results.map(p => <li onClick={()=> getPoke(p.url)}>{p.name}</li>)
      const poke = <div>
                      <img src={data.sprites.front_default} alt='pokemon'/>
                      <h3>{data.name}</h3>
                      <p>Type: {data.types[0].type.name} {data.types.length > 1 ? '/' + data.types[1].type.name : null}</p>
                      <p>Height: {data.height}</p>
                      <p>Weight: {data.weight}</p>
                      <p>Base exp: {data.base_experience}</p>
                  </div>
      setState({displayPoke: true, pokeToDisplay: poke, pokemon: pokeData, isLoading: false})
    } catch(er) {
      console.log(er)
    }
  }

  useEffect(()=> {
    if (state.isLoading) {
      getData()
    }
  })

  return (
    <div>
      <div>
        {state.displayPoke ? state.pokeToDisplay : <h2>Click a poke to learn more!</h2>}
      </div>
      <ul>
        {state.pokemon}
      </ul>
    </div>
  )

}