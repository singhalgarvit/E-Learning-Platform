import {AuthContextProvider} from "./authContext";
import {CourseContextProvider} from "./courseContext";
import {SideBarToggleProvider} from "./sideBarToggle";
import {LoadingContextProvider} from "./loadingContext";

const ContextProvider = ({children}) => {
  return (
    <SideBarToggleProvider>
      <CourseContextProvider>
        <LoadingContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </LoadingContextProvider>
      </CourseContextProvider>
    </SideBarToggleProvider>
  );
};

export default ContextProvider;
