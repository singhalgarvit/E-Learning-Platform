import React, {useContext, useState} from "react";
import "../../styles/form.css";
import Input from "../../components/Input";
import {useCourse} from "../../hooks/useCourse";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import {imgToS3} from "../../utils";

function AddCourse() {
  const [courseData, setCourseData] = useState({});
  const [img, setImg] = useState(null);
  const [drag,setDrag] = useState(false)
  const {setCourse, loading, error} = useCourse(); //Course Hook
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setImg(droppedFile);
      setDrag(false)
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true)
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const uploadImg = await imgToS3(img);
    try {
      const res = await setCourse({...courseData, img: uploadImg}, token);
      if (res) navigate("/course");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div  onDrop={handleDrop} onDragOver={handleDragOver} onDragEnd={(e)=>setDrag(false)} onDragLeave={(e)=>setDrag(false)}>
      <h1>Add Course</h1>
      <form style={drag?{boxShadow:"0px 0px 10px #1058B7"}:{}} onSubmit={onSubmit}>
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

        {/* <Input
          type="file"
          name="img"
          placeholder="Course Img URL"
          onchange={(e) => setImg(e.target.files[0])}
          require="true"
          accept="image/*"
        /> */}
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          style={{display: "none"}} // Hide the file input element
          id="file-input"
          accept="image/*"
        />
        <label htmlFor="file-input" style={{border:"2px solid black",padding:"20px",margin:"10px"}}>
          {img ? img.name : "Drag and drop a file here or click to select"}
        </label><br /><br />

        <button type="submit">{loading ? "Adding..." : "Add Course"}</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  );
}

export default AddCourse;
