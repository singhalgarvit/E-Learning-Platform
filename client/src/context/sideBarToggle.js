import { createContext, useState } from "react";

 const SideBarToggleContext = createContext();

 const SideBarToggleProvider = ({children})=>{
    const [toggle,setToggle] = useState(false)

    return(
        <SideBarToggleContext.Provider value={{toggle,setToggle}}>
            {children}
        </SideBarToggleContext.Provider>
    )
}

export {SideBarToggleContext , SideBarToggleProvider}

