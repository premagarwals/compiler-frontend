import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './comps/ProtectedRoute'
import Landing from './pages/Landing'
import Dashboard from './pages/AddProblem'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AllProblems from './pages/AllProblems'
import Problem from './pages/Problem'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/addproblem"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/problems" element={<AllProblems />} />
        <Route path="/problem/:id" element={<Problem />} />
      </Routes>
    </Router>
  )
}

export default App
