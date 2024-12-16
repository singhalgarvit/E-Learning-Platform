import {useContext, useState} from "react";
import {CourseContext} from "../context/courseContext";
import {getAllCourses, createCourse, deleteCourseById} from "../api/api.course";
import { errorToast, successToast } from "../utils";

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
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setCourse = async (courseData,token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createCourse(courseData,token);
      successToast(data)
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId,token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await deleteCourseById(courseId,token);
      successToast(data)
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return {getCourse, setCourse, deleteCourse, loading, error};
};
