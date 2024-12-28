import {useContext, useState} from "react";
import {CourseContext} from "../context/courseContext";
import {getCourseContent, setCourseContent} from "../api/api.content";
import {LoadingContext} from "../context/loadingContext";
import {errorToast, successToast} from "../utils";

export const useContent = () => {
  const {content, setContent} = useContext(CourseContext);
  const {loading, setLoading} = useContext(LoadingContext);
  const [error, setError] = useState(null);

  const getContent = async (token, course_id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourseContent(token, course_id);
      setContent(data);
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setContents = async (contentData, token, course_id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await setCourseContent(contentData, token, course_id);
      successToast(data);
      return "Success";
    } catch (err) {
      setError(err.message);
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {getContent, setContents, error};
};
