import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NewPortfolio from './Pages/NewPortfolio'
import Portfolio from './Pages/Portfolio'
import Members from './Pages/Members'
import GroupChat from './Pages/GroupChat'
import Admin from './Pages/Admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/newportfolio' element={<NewPortfolio/>} />
        <Route path='/portfolio' element={<Portfolio/>} />
        <Route path='/members' element={<Members/>} />
        <Route path='/groupchat' element={<GroupChat/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  )
}

export default App