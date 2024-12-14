
const signup = async(userData) =>{
    const url=`${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
      const response = await fetch(url,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })
      
      if(!response.ok){
        const errMsg=await response.json();
        throw new Error(errMsg);
      }
  
      const data= await response.json();
      return data
}
export default signup