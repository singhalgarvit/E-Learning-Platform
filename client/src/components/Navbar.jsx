import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import logo from '../assets/ShikshaSetu.png'
import { CgMenuRight } from "react-icons/cg";
import { SideBarToggleContext } from '../context/sideBarToggle'
import { AuthContext } from '../context/authContext'
import { getRole ,getName, successToast} from '../utils'


function AuthButtons(){
  return(
    <div style={{display:"flex",gap:"10px"}}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </div>
  )
}

function Profile({logout}){
  const name=getName();
  return(
    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
      <Link onClick={logout}>Logout</Link>
      <p title={name}>{name[0]+name[1]}</p>
    </div>
  )
}



function Navbar() {
  const {token ,setToken} = useContext(AuthContext)
  const {toggle,setToggle} = useContext(SideBarToggleContext)

  const logout = ()=>{
    localStorage.removeItem("token")
    setToken(null)
    successToast("Logout Success")
  }

  return (
    <nav>
        <CgMenuRight onClick={(e)=>setToggle(!toggle)} style={{cursor:"pointer",fontSize:"25px"}}/>
        <img src={logo} alt="Logo" />
        {token?<Profile logout={logout}/>:<AuthButtons/>}
    </nav>
  )
}

export default Navbar