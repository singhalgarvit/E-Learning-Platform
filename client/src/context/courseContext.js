import { createContext, useState } from "react";

const CourseContext = createContext();

const CourseContextProvider = ({children})=>{

    const [courses,setCourses] = useState([]);

    return(
        <CourseContext.Provider value={{courses, setCourses}}>
            {children}
        </CourseContext.Provider>
    )
}
export {CourseContext, CourseContextProvider}