import React, { useState } from 'react'
// import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
// import SearchBar from '../SearchBar/SearchBar';
const Navbar = ( {userInfo } ) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
  }
  return (
    <div className='bg-cpurple dark:bg-stone-800 px-6 py-2 drop-shadow text-center shadow-md shadow-gray-400 dark:shadow-none dark:border-none sm:h-24 sm:grid-cols-3 h-fit col-span-1 '>
      <h2 className='text-3xl  text-zinc-200 font-semibold py-2 text-center'>Pensieve</h2>
      {/* <ProfileInfo userInfo= {userInfo} onLogout={onLogout}/> */}
    </div>
  )
}

export default Navbar