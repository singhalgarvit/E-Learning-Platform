import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'
import { FiHome } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { GrCloudDownload } from "react-icons/gr";
import { SideBarToggleContext } from '../context/sideBarToggle';

function SideBar() {
    const {toggle} = useContext(SideBarToggleContext);
  return (
    <div className='sideBar' style={toggle?{}:{display:"none"}}>
            <ul>
                <Link to='/'><li><FiHome /> Home</li></Link>
                <Link to='/course'><li><RiGraduationCapLine /> Courses</li></Link>
                <Link to='/purchase'><li><GrCloudDownload /> Purchases</li></Link>
            </ul>
    </div>
  )
}

export default SideBar