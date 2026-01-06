import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { MainDashboard } from './dashboard/maindashboard/MainDashboard'
import { User } from './dashboard/user/User'
import ProtectedRoute from './utils/protectedRoute/ProtectedRoute'
import { AddUser } from './pages/addUser/AddUser'
import { EditUser } from './pages/editUser/EditUser'
import { Onboarding } from './dashboard/onboarding/Onboarding'
import { CostExplorer } from './dashboard/costExplorer/CostExplorer'

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
            <Route path='adduser' element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
            <Route path='edituser' element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
            <Route path='user' element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path='onboading' element={<Onboarding />} />
            <Route path='costexplorer'element={<CostExplorer/>} />

          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
