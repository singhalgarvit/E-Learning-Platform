import React, {useContext, useState} from "react";
import "../../styles/form.css";
import Input from "../../components/Input";
import {useCourse} from "../../hooks/useCourse";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import {useS3} from "../../hooks/useS3";
import {LoadingContext} from "../../context/loadingContext";

function AddCourse() {
  const {loading} = useContext(LoadingContext);
  const [courseData, setCourseData] = useState({});
  const [img, setImg] = useState(null);
  const {setCourse, error} = useCourse(); //Course Hook
  const {uploadToS3} = useS3();
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
    const uploadImg = await uploadToS3(img);
    try {
      const res = await setCourse({...courseData, img: uploadImg}, token);
      if (res) navigate("/course");
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
          type="file"
          name="img"
          placeholder="Course Img URL"
          onchange={(e) => setImg(e.target.files[0])}
          require="true"
          accept="image/*"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}

export default AddCourse;
