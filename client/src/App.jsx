import { useState } from 'react'
import './App.css'
import EarhtquakesList from './features/eartquakes/EarthquakesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <h1>React & Ruby Terremotos</h1>
      <p>Encuentra este archivo de layout en client/app/App.jsx</p>
      <EarhtquakesList />
    </div>
  )
}

export default App
