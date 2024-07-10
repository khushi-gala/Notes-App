import React from 'react'
import { getInitials } from '../../helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className='flex flex-col sm:flex-row items-center gap-3 w-full sm:w-fit'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-lightpurple dark:text-zinc-200 font-medium dark:bg-stone-700'>
          {getInitials(userInfo?.fullName)}
        </div>
        <div className='text-center sm:text-left'>
          <p className='text-sm font-medium dark:text-zinc-200'>{userInfo?.fullName}</p>
          <button className="text-sm dark:text-zinc-200 hover:underline hover:text-white" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
);
}

export default ProfileInfo;