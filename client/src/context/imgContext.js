import { createContext, useState } from "react";

const ImgContext = createContext();

const ImgContextProvider = ({children})=>{
    const [img,setImg] = useState(null);

    return(
        <ImgContext.Provider value={{img ,setImg}}>
            {children}
        </ImgContext.Provider>
    )
}
export {ImgContext, ImgContextProvider}