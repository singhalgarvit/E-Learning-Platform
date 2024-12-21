import React, {useContext, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import Input from "../components/Input";
import "../styles/form.css";
import {useAuth} from "../hooks/useAuth";
import { LoadingContext } from "../context/loadingContext";

function Login() {
  const {loading} = useContext(LoadingContext);
  const {handleLogin, error} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleLogin(userData.email, userData.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <title>Login</title>

      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={userData.email}
          oninput={handleInputChange}
          require="true"
        />

        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder={showPassword ? "John@123" : "********"}
          value={userData.password}
          oninput={handleInputChange}
          require="true"
        />

        <div className="showPassword">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={showPassword}
            onChange={(e) => setShowPassword(!showPassword)}
          />
          <label htmlFor="toggle">Show Password</label>
        </div>

        <button type="submit">{loading ? "Loggin in..." : "Login"}</button>
      </form>
      {error && <p style={{color: "red"}}>{error}</p>}
      <p>
        Don't Have an Account <Link to="/signup">Signup Here</Link>
      </p>
    </div>
  );
}

export default Login;
