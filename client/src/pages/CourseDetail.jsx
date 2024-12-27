import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {CourseContext} from '../context/courseContext'
import {AuthContext} from '../context/authContext'
import {useCourse} from '../hooks/useCourse'
import '../styles/courseDetail.css'
import { getRole } from '../utils'
import Content from '../components/Content'

function CourseDetail() {
    const {course_id} = useParams();
    const {courses, myCourses} = useContext(CourseContext);
    const {token} = useContext(AuthContext)
    const detail = courses.filter((course)=>course._id == course_id);
    const role = getRole();

    const {buyCourse} = useCourse();
    const handlePurchase = async () =>{
      try{
        await buyCourse(course_id,token)
      }catch(err){
        console.error(err);
      }
    }

    const hasUserPurchasedThisCourse = myCourses.some((course)=>course._id == course_id);

    const BuyBtn = () =>{
      return <button onClick={handlePurchase}>Buy Now</button>
    }

  return (
    <div className='courseDetailsContainer'>
        <h1>{detail[0].name}</h1>
        <img src={detail[0].img} alt="" />
        <p className='price'>{detail[0].price} Rs.</p>
        <p className='detail'>{detail[0].details}</p>
        {(role == "student" && !hasUserPurchasedThisCourse) && <BuyBtn/>}
        {(role == "student" && hasUserPurchasedThisCourse) && <Content course_id={detail[0]._id}/>}
    </div>
  )
}

export default CourseDetail