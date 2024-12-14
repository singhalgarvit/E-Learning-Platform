import {Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Course from './pages/Course'
import Purchase from './pages/Purchase'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const {token} = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course' element={<Course/>}/>
        <Route path='/purchase' element={<Purchase/>}/>
        <Route path='/login' element={token?<Navigate to="/"/>:<Login/>}/>
        <Route path='/signup' element={token?<Navigate to="/"/>:<Signup/>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
