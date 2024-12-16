import React, {useContext, useState} from "react";
import "../../styles/form.css";
import Input from "../../components/Input";
import { useCourse } from "../../hooks/useCourse";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [courseData, setCourseData] = useState({});       
  const {setCourse, loading, error} = useCourse();      //Course Hook
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await setCourse(courseData,token);
      if(res) navigate("/course");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add Course</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Course Title"
          value={courseData.name}
          oninput={handleInputChange}
          require="true"
        />
        <Input
          type="text"
          name="category"
          placeholder="Online/Offline"
          value={courseData.category}
          oninput={handleInputChange}
          require="true"
        />
        <Input
          type="number"
          name="price"
          placeholder="Course Price"
          value={courseData.price}
          oninput={handleInputChange}
          require="true"
        />
        <Input
          type="text"
          name="details"
          placeholder="Details"
          value={courseData.details}
          oninput={handleInputChange}
          require="true"
        />
        <Input
          type="text"
          name="img"
          placeholder="Course Img URL"
          value={courseData.img}
          oninput={handleInputChange}
          require="true"
        />

        <button type="submit">{loading? "Adding...":"Add Course"}</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default AddCourse;
