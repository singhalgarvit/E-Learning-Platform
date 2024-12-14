
const getAllCourses = async() =>{
    const url=`${process.env.REACT_APP_BACKEND_URL}/api/course`;
      const response = await fetch(url,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      
      if(!response.ok){
        const errMsg=await response.json();
        throw new Error(errMsg);
      }
  
      const data= await response.json();
      return data
}
export default getAllCourses