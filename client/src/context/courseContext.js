import {createContext, useState} from "react";

const CourseContext = createContext();

const CourseContextProvider = ({children}) => {
  const [courses, setCourses] = useState([]);
  const [myCourses,setMyCourses] = useState([]);

  return (
    <CourseContext.Provider value={{courses, setCourses, myCourses,setMyCourses}}>
      {children}
    </CourseContext.Provider>
  );
};
export {CourseContext, CourseContextProvider};
