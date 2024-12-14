import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/courseContainer.css'

function CourseContainer({img,name,details,price}) {
  return (
    <div className="container">
      <img src={img} alt="Course Img" />
      <div className="subContainer">
        <h3>{name}</h3>
        <p className='details'>{details}</p>
        <p>${price}</p>
      </div>
      <Link to="/">View Course</Link>
    </div>
  );
}

export default CourseContainer