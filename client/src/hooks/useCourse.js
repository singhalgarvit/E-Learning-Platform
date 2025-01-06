import {useContext, useState} from "react";
import {CourseContext} from "../context/courseContext";
import { getAllCourses, createCourse, deleteCourseById, purchaseCourse,getMyPurchasedCourses} from "../api/api.course";
import {errorToast, successToast} from "../utils";
import {LoadingContext} from "../context/loadingContext";

export const useCourse = () => {
  const {setCourses, setMyCourses} = useContext(CourseContext);
  const {loading, setLoading} = useContext(LoadingContext);
  const [error, setError] = useState(null);

  const getCourse = async () => {                     //To get all the courses 
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

  const setCourse = async (courseData, token) => {        //Admin API to create Course 
    setLoading(true);
    setError(null);
    try {
      const data = await createCourse(courseData, token);
      successToast(data);
      return "Success";
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId, token) => {         //Admin API to delete a course
    setLoading(true);
    setError(null);
    try {
      const data = await deleteCourseById(courseId, token);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      successToast(data);
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const buyCourse = async (course_id, token, price) => {             //Student API to Buy a Course 
    setLoading(true);
    setError(null);
    try {
      const data = await purchaseCourse(course_id, token, price);
      successToast(data);
      return "Success";
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMyCourses = async ( token) => {                //Student API to get his purchased courses
    setLoading(true);
    setError(null);
    try {
      const data = await getMyPurchasedCourses(token);
      setMyCourses(data);
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {getCourse, setCourse, deleteCourse, buyCourse,getMyCourses, error};
};
