import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { MainDashboard } from './dashboard/maindashboard/MainDashboard'
import { User } from './dashboard/user/User'
import ProtectedRoute from './utils/protectedRoute/ProtectedRoute'
import { AddUser } from './pages/addUser/AddUser'
import { EditUser } from './pages/editUser/EditUser'
import Onboarding from './dashboard/onboarding/Onboarding'
import { CostExplorer } from './dashboard/costExplorer/CostExplorer'
import { Toaster } from 'sonner'
import NotFound from './pages/notFound/NotFound'
import { AwsAccounts } from './dashboard/awsAccounts/AwsAccounts'

function App() {

  return (
    <>

    <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }>

            <Route index element={<Navigate to='User' replace/>} />
            <Route path='adduser' element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
            <Route path='edituser' element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
            <Route path='user' element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path='onboading' element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path='costexplorer'element={<ProtectedRoute><CostExplorer/></ProtectedRoute>} />
            <Route path='aws' element={<ProtectedRoute><AwsAccounts/></ProtectedRoute>} />

          </Route>

          <Route path="*" element={<NotFound/>} />


        </Routes>
      </Router>
    </>
  )
}

export default App
