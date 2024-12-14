import React, { useState } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import Input from '../components/Input';
import '../styles/form.css'
import { useAuth } from '../hooks/useAuth';

function Signup() {
  const {handleSignup, loading, error,} = useAuth();
  const [showPassword,setShowPassword] = useState(false);
  const [userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setUserData((prevData) => ({
      ...prevData, 
      [name]: value 
    }));
  };
  
  

  const onSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res = await handleSignup(userData);
      }catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>

      <Input
            type="text"
            name='name' 
            placeholder='John Doe'
            value={userData.name}
            oninput={handleInputChange}
            require="true"
        />

        <Input
            type="email"
            name='email' 
            placeholder='john@example.com'
            value={userData.email}
            oninput={handleInputChange}
            require="true"
        />

        <Input
            type={showPassword?"text":"password"}
            name='password' 
            placeholder={showPassword?"John@123":"********"}
            value={userData.password}
            oninput={handleInputChange}
            require="true"
        />

        <div className='showPassword'>
          <input 
          type="checkbox" 
          name='toggle'
           id='toggle'
           checked={showPassword}
           onChange={(e) => setShowPassword(!showPassword)}/>
          <label htmlFor="toggle">Show Password</label>
        </div>

        <button type='submit'>{loading?"Signing in...":"Signup"}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p>Already Have an Account <Link to="/login">Login Here</Link></p>
    </div>
  )
}

export default Signup