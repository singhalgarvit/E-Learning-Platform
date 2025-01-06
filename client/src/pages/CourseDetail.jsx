import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {CourseContext} from '../context/courseContext'
import {AuthContext} from '../context/authContext'
import {useCourse} from '../hooks/useCourse'
import '../styles/courseDetail.css'
import { getRole } from '../utils'
import Content from '../components/Content'
import AddContent from './admin/AddContent'
import { LoadingContext } from '../context/loadingContext'

function CourseDetail() {
    const {course_id} = useParams();
    const {courses, myCourses} = useContext(CourseContext);
    const {token} = useContext(AuthContext)
    const {loading, setLoading} = useContext(LoadingContext);
    const detail = courses.filter((course)=>course._id == course_id);
    const role = getRole();
    const navigate = useNavigate();

    const {buyCourse, getCourse, getMyCourses} = useCourse();
    const handlePurchase = async () =>{
      try{
       const res= await buyCourse(course_id,token,detail[0].price)
       if(res) navigate("/MyCourses")
      }catch(err){
        console.error(err);
      }
    }

    useEffect(() => {
      const fetchData = async () => {
          const res = await getCourse();
          const res2 = await getMyCourses(token);
      };
      fetchData();
    }, []);

    const hasUserPurchasedThisCourse = myCourses.some((course)=>course._id == course_id);

    const BuyBtn = () =>{
      return <button onClick={handlePurchase}>Buy Now</button>
    }

  return (
    <>
    {detail && detail[0] && (<div className='courseDetailsContainer'>
        <h1>{detail[0].name}</h1>
        <img src={detail[0].img} alt="" />
        <p className='price'>{detail[0].price} Rs.</p>
        <p className='detail'>{detail[0].details}</p>
        {(role == "student" && !hasUserPurchasedThisCourse) && <BuyBtn/>}
        {(role == "student" && hasUserPurchasedThisCourse) && <Content course_id={detail[0]._id}/>}
        {(role == "admin") && <><Content course_id={detail[0]._id}/><AddContent course_id={detail[0]._id}/></>}
    </div>)}
    </>
  )
}

export default CourseDetail