import React, { useContext, useEffect } from 'react'
import '../styles/home.css'
import pic02 from '../assets/pic02.jpg'
import pic03 from '../assets/pic03.png'
import { AuthContext } from '../context/authContext';
import { useCourse } from '../hooks/useCourse';



function Home() {


  return (
    <div className="homeContainer">
      <title>Shiksha Setu</title>
      <img src={pic02} alt="Hero Pic" />
      <img src={pic03} alt="Hero Page" />
      <div className="aboutUs">
        <h1>About Us</h1>
        <p>
          Shiksha Setu is an innovative e-learning platform designed to bridge
          the gap between students and quality education. Offering a wide range
          of interactive courses, tutorials, and resources, Shiksha Setu aims to
          make learning accessible and engaging for students of all ages. With a
          user-friendly interface and personalized learning paths, the platform
          provides an immersive experience, enabling learners to enhance their
          knowledge and skills at their own pace.
        </p>
      </div>
    </div>
  );
}

export default Home