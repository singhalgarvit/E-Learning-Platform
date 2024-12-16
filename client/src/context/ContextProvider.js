import {AuthContextProvider} from "./authContext";
import {CourseContextProvider} from "./courseContext";
import {SideBarToggleProvider} from "./sideBarToggle";

const ContextProvider = ({children}) => {
  return (
    <SideBarToggleProvider>
      <CourseContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </CourseContextProvider>
    </SideBarToggleProvider>
  );
};

export default ContextProvider;
