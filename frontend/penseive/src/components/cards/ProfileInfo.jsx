import React from 'react'
import { getInitials } from '../../helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className='flex flex-col sm:flex-row items-center gap-3 w-full sm:w-fit'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-lightpurple dark:text-zinc-300 font-medium dark:bg-stone-700'>
          {getInitials(userInfo?.fullName)}
        </div>
        <div className='text-center sm:text-left'>
          <p className='text-sm font-medium text-zinc-300 dark:text-zinc-300'>{userInfo?.fullName}</p>
          <button className="text-sm text-zinc-300 dark:text-zinc-300 hover:underline hover:text-white hover:hover:scale-125 transition-all ease-in-out" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
);
}

export default ProfileInfo;