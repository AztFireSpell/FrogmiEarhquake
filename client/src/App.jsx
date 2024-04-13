import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import AppRoutes from './components/AppRoutes'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className='app'>
      <h1>React & Ruby Terremotos</h1>
      <p>Encuentra este archivo de layout en client/app/App.jsx</p>
      <NavBar/>
      <AppRoutes/>
    </div>
    </Router>
  )
}

export default App
