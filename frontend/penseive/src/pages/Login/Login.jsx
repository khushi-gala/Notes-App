import React, { useState } from 'react'
import LoginSignUpNav from "../../components/Navbar/LoginSignUpNav"; 
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from '../../components/input/Passwordinput';
import { validateEmail } from '../../helper';
import axiosInstance from '../../../utils/axiosinstance';

const Login = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter the password.");
      return;
    }
    setError("")
    //Login API Call
    try{
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch (error){
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else{
        setError("An unexpected error occured. Please try again.");
      }
    };

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        handleLogin();
    }
}
  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen min-w-screen flex flex-col">
    <LoginSignUpNav />
    <div className="flex items-center justify-center mt-10 md:mt-20">
      <div className="w-11/12 sm:w-96 border rounded bg-white dark:bg-stone-800 dark:border-none dark:shadow-none px-7 py-6 shadow-md shadow-gray-400">
        <form 
        onSubmit={handleLogin}
        onKeyDown={handleKeyDown}
        >
          <h4 className="text-3xl mb-2 py-5 pt-0 text-center text-black dark:text-zinc-300">Login</h4>
          <input
            type="text"
            placeholder="Email"
            className="input-box bg-lightpurple placeholder:text-neutral-800 text-white dark:placeholder:text-zinc-300 dark:text-zinc-300 dark:bg-stone-900 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4"
          />
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button
            type="submit"
            className="text-lg btn-primary bg-cpurple text-white dark:text-zinc-300 dark:bg-blue-900 hover:scale-95 transition-all ease-in-out w-full py-2"
          >
            Login
          </button>
          <p className="text-sm text-center mt-1 py-5 dark:text-zinc-300">
            Not registered yet?{" "}
            <Link to="/SignUp" className="font-medium text-violet-900 dark:text-indigo-700 dark:hover:text-indigo-200 underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>

  )
}

export default Login