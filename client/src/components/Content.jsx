import React, {useContext, useEffect} from "react";
import {CourseContext} from "../context/courseContext";
import {useContent} from "../hooks/useContent";
import {AuthContext} from "../context/authContext";

function Content({course_id}) {
  const {content} = useContext(CourseContext);
  const {token} = useContext(AuthContext);
  const {getContent, error} = useContent();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getContent(token, course_id);
        console.log(content);
      } catch (error) {
        console.error("Something Went Wrong !!");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="contentsContainer">
      {!error &&
        content.map((content, index) => (
          <div className="containerContent" key={index} style={{border:"2px solid black",margin:"55px"}}>
            <img src={content.url} alt="" style={{width:"100px"}}/>
            <p>{content.name}</p>
            <p>{content.description}</p>
          </div>
        ))}
    </div>
  );
}

export default Content;
