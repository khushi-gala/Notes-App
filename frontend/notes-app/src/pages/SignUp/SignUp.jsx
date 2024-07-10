import React, { useState } from 'react'
import LoginSignUpNav from "../../components/Navbar/LoginSignUpNav"; 
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from '../../components/input/Passwordinput';
import { validateEmail } from '../../helper';
import axiosInstance from '../../../utils/axiosinstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const handleSignUp = async (e) =>{
    e.preventDefault();
    
    if(!name) {
      setError("Please enter your name.")
      return;
    }
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if(!password) {
      setError("Please enter the password.")
      return;
    }
    setError('')
    //SignUp API Call
    try{
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle successful registration response
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

      if (response.data && response.data.accessToken){
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

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen min-w-screen flex flex-col">
    <LoginSignUpNav />

    <div className="flex items-center justify-center mt-10 md:mt-16">
      <div className="w-11/12 sm:w-96 border rounded bg-white dark:bg-stone-800 px-7 py-8 shadow-md shadow-gray-400 dark:shadow-none dark:border-none">
        <form onSubmit={handleSignUp}>
          <h4 className="text-3xl pt-0 dark:text-zinc-300 mb-1 py-5 text-center">SignUp</h4>
          <input
            type="text"
            placeholder="Name"
            className="input-box bg-lightpurple placeholder:text-neutral-800 dark:placeholder:text-zinc-300 dark:text-zinc-200 dark:bg-stone-900 w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="input-box bg-lightpurple placeholder:text-neutral-800 dark:placeholder:text-zinc-300 dark:text-zinc-300 dark:bg-stone-900 w-full mb-4"
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
            className="btn-primary text-lg bg-cpurple text-white dark:bg-blue-900 dark:text-zinc-300 hover:scale-95 transition-all ease-in-out w-full py-2"
          >
            Create Account
          </button>
          <p className="text-sm text-center mt-1 pt-5 dark:text-zinc-300 pb-3">
            Already have an account?{" "}
            <Link to="/Login" className="font-medium text-violet-900 dark:text-indigo-700 dark:hover:text-indigo-200 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
  )
    
  
};

export default SignUp;