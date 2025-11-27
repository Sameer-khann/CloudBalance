// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { MainDashboard } from './dashboard/maindashboard/MainDashboard'
import { User } from './dashboard/user/User'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<MainDashboard />}>

            <Route index element={<User />} />
            <Route path='user' element={<User />} />

          </Route>

          

        </Routes>
      </Router>
    </>
  )
}

export default App
