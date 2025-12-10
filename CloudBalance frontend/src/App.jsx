import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { MainDashboard } from './dashboard/maindashboard/MainDashboard'
import { User } from './dashboard/user/User'
import ProtectedRoute from './utils/protectedRoute/ProtectedRoute'
import { AddUser } from './components/addUser/AddUser'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }>

            <Route index element={<User />} />
            <Route path='adduser' element={<ProtectedRoute><AddUser/></ProtectedRoute>} />
            {/* <Route path='user' element={<User />} /> */}

          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
