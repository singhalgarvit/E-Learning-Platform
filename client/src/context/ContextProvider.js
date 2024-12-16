import {AuthContextProvider} from "./authContext";
import {CourseContextProvider} from "./courseContext";
import {SideBarToggleProvider} from "./sideBarToggle";
import {ImgContextProvider} from "./imgContext";

const ContextProvider = ({children}) => {
  return (
    <SideBarToggleProvider>
      <CourseContextProvider>
        <ImgContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ImgContextProvider>
      </CourseContextProvider>
    </SideBarToggleProvider>
  );
};

export default ContextProvider;
