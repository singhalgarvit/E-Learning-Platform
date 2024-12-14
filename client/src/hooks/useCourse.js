import {useContext, useState} from "react";
import {CourseContext} from "../context/courseContext";
import getAllCourses from "../api/api.course";

export const useCourse = () => {
  const {courses, setCourses} = useContext(CourseContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCourse = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {getCourse, loading, error};
};
