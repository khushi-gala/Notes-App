import React from 'react'
import { GrNotes } from "react-icons/gr";

const EmptyCard = ({ message }) => {
  return (
    <div className='bg-gray-100 dark:bg-black items-center top-0 justify-center min-h-screen min-w-screen flex flex-col sm:px-6 lg:px-8'>
        <GrNotes className=' dark:text-zinc-200 mb-3 mt-0 ' size={220}/>
        <p className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-xs sm:text-sm md:text-base font-medium text-slate-700 dark:text-zinc-200 text-center leading-7'>
            {message}
        </p>
    </div>
  );
};

export default EmptyCard;