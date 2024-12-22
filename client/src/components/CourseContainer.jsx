import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "../styles/courseContainer.css";
import {AuthContext} from "../context/authContext";
import getRole from "../utils/getRole";
import {MdDeleteOutline} from "react-icons/md";
import { useCourse } from "../hooks/useCourse";

function CourseContainer({img, name, details, price,id}) {
  const {token} = useContext(AuthContext);
  const { deleteCourse, loading, error} = useCourse();
  const role = getRole();

  const handleDeleteCourse = async() =>{
    try{
      const res = await deleteCourse(id,token);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="container">
      <img src={img} alt="Course Img" />
      <div className="subContainer">
        <h3>{name}</h3>
        <p className="details">{details}</p>
        <p>{price} Rs.</p>
      </div>
      <div className="buttons">
        <Link to={`/course/${id}`}>View Course</Link>
        {role == "admin" && (
          <button onClick={handleDeleteCourse}>
            <MdDeleteOutline />
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseContainer;
