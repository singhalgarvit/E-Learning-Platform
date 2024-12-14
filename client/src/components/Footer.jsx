import React from 'react'
import '../styles/footer.css'
import logo from '../assets/ShikshaSetu.png'
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

function Footer() {
  return (
    <footer>
        <img src={logo} alt="" />   
        <div className='contact'>
            <h3>Follow Us on</h3>
            <span className='socialIcons'>
                <FaInstagram />
                <FaXTwitter />
                <FiYoutube />
            </span>
        </div>
    </footer>
  )
}

export default Footer