const getAllCourses = async () => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

const createCourse = async (courseData, token) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

const deleteCourseById = async (courseId, token) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/course/${courseId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data;
};

export {getAllCourses, createCourse, deleteCourseById};
