import { useContext ,useState} from "react"
import { AuthContext } from "../context/authContext"
import login from "../api/api.login";
import signup from "../api/api.signup";
import {successToast, errorToast} from '../utils'

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
            successToast("Login Success")
        }catch(err){
            setError(err.message);
            errorToast(err.message);
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
            successToast("Signup Success")
        }catch(err){
            setError(err.message);
            errorToast(err.message);
        }finally{
            setLoading(false)
        }
    };

    return {loading, error, handleLogin, handleSignup}
}