const getCourseContent = async (token, course_id) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/content`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token:token,
      course_id:course_id
    },
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

const setCourseContent = async (contentData,token, course_id) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/content`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token:token,
      course_id:course_id
    },
    body:JSON.stringify(contentData)
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};
export {getCourseContent, setCourseContent};
