import React, { useContext, useState } from 'react'
import { LoadingContext } from '../../context/loadingContext';
import {useS3} from "../../hooks/useS3";
import {AuthContext} from "../../context/authContext";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { useContent } from '../../hooks/useContent';



function AddContent({course_id}) {
    const {loading} = useContext(LoadingContext);
    const [contentData, setContentData] = useState({});
    const [img, setImg] = useState(null);
    const {setContents, error} = useContent(); //Course Hook
    const {uploadToS3} = useS3();
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setContentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      const uploadImg = await uploadToS3(img);
      try {
        const res = await setContents({...contentData, url: uploadImg},token,course_id);
        if (res) navigate("/course");
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <h1>Add Content</h1>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Content Title"
            value={contentData.name}
            oninput={handleInputChange}
            require="true"
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={contentData.description}
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
            {loading ? "Adding..." : "Submit"}
          </button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
      </div>
    );
  }


export default AddContent