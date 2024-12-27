import {createContext, useState} from "react";

const CourseContext = createContext();

const CourseContextProvider = ({children}) => {
  const [courses, setCourses] = useState([]);
  const [myCourses,setMyCourses] = useState([]);
  const [content,setContent] = useState([]);

  return (
    <CourseContext.Provider value={{courses, setCourses, myCourses,setMyCourses, content ,setContent}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseContextProvider};
