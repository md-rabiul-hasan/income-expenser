import { useState } from 'react'
import './App.css'
import IncomeExpanserBoard from './components/IncomeExpanserBoard'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <IncomeExpanserBoard />
    </>
  )
}

export default App
