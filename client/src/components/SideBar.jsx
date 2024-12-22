import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'
import { FiHome } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { GrCloudDownload } from "react-icons/gr";
import { SideBarToggleContext } from '../context/sideBarToggle';
import { MdOutlineDashboard } from "react-icons/md";  
import { getRole } from '../utils';
import { AuthContext } from '../context/authContext';

function SideBar() {
    const {toggle,setToggle} = useContext(SideBarToggleContext);
    const role = getRole();
  return (
    <div className='sideBar' style={toggle?{}:{display:"none"}}>
            <ul>
                <Link onClick={(e)=>setToggle(!toggle)} to='/'><li><FiHome /> Home</li></Link>
                <Link onClick={(e)=>setToggle(!toggle)} to='/course'><li><RiGraduationCapLine /> Courses</li></Link>
                {(role == "student") && <Link onClick={(e)=>setToggle(!toggle)} to='/MyCourses'><li><GrCloudDownload /> My Courses</li></Link>}
                {(role== "admin")?<Link onClick={(e)=>setToggle(!toggle)} to='/admin/dashboard'><li><MdOutlineDashboard />Dashboard</li></Link>:""}
            </ul>
    </div>
  )
}

export default SideBar