import { useContext ,useState} from "react"
import { AuthContext } from "../context/authContext"
import login from "../api/api.login";
import signup from "../api/api.signup";

export const useAuth = () =>{
    const {token , setToken} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (email,password) =>{
        setLoading(true);
        setError(null);
        try{
            const data = await login(email,password);
            setToken(data)
            localStorage.setItem("token",data)
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false)
        }
    };

    const handleSignup = async (userData) =>{
        setLoading(true);
        setError(null);
        try{
            const data = await signup(userData);
            setToken(data)
            localStorage.setItem("token",data)
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false)
        }
    };

    return {loading, error, handleLogin, handleSignup}
}