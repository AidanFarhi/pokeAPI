import React, {useState, useEffect} from 'react';
import './App.css';

export default function App() {
  const[state, setState] = useState({
    names: [],
    isLoading: true
  })

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=150`)
      const json = await response.json()
      const res = []
      for (let poke of json.results) {
        res.push(<li>{poke.name}</li>)
      }
      setState({names: res, isLoading: false})
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(()=> {
    if (state.isLoading) {
      fetchData()
    }
  })

  return (
    <div>
      <ul>
        {state.names}
      </ul>
    </div>
  )
}
