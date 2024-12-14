import React from 'react'
import '../styles/course.css'
import CourseContainer from '../components/CourseContainer'
import courses from '../course.json'

function Course() {
  return (
    <div className="coursePage">
      {courses.map((course, index) => (
        <CourseContainer
          key={index}
          name={course.name}
          img={course.img}
          details={course.details}
          price={course.price}
        />
      ))}
    </div>
  );
}

export default Course