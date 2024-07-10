import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const PasswordInput= ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = ()=>{
    setIsShowPassword(!isShowPassword);
  }
  return (
    <div className='flex items-center bg-lightpurple text-white dark:bg-stone-900 px-5 rounded mb-3'>
      <input 
      value={value}
      onChange={onChange}
      type={isShowPassword ? "text" : "password"}
      placeholder={placeholder || "Password"}
      className="w-full text-sm dark:text-zinc-300 bg-transparent py-3 mr-3 rounded outline-none placeholder:text-neutral-800 dark:placeholder:text-zinc-300"
      />
      { isShowPassword ? (
        <FaRegEye
        size={22}
        className="text-white dark:text-neutral-300  cursor-pointer"
        onClick={() => toggleShowPassword()}
      />
      ) : (
        <FaRegEyeSlash
        size={22}
        className="text-gray-300 dark:text-neutral-400 cursor-pointer"
        onClick={() => toggleShowPassword()}
      />
      )
    }
      

    </div>
  )
}

export default PasswordInput