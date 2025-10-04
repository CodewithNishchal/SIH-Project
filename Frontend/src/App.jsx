import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import CreateAlertPage from './Components/createAlert.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Outlet />
    </>
  )
}

export default App
