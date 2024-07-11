import React, { useEffect } from 'react';
import { LuCheck} from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  // if (isShown) {
  //   return null;
  // }

  return (
    <div
    className={`fixed top-20 right-6 md:top-28 md:right-6 md:left-auto md:transform-none transition-all duration-400 ${
      !isShown ? "opacity-0 " : "opacity-100"
    }`}
    >
      <div
      className={`min-w-52 bg-white dark:bg-neutral-800 border shadow-2xl rounded-md after:w-[5px] after:h-full ${
        type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
      } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
      <div className='flex items-center gap-3 sm:gap-3 py-2 px-4'>
        <div className={`w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${
          type === "delete" ? "bg-red-50 " : "bg-gray-50 "
        }`}
        >
          { type === 'delete' ? (<MdDeleteOutline className='text-xl text-red-500' />)
          :
          (<LuCheck className='text-xl text-green-500' />) 
        } 
        </div>
        <p className='text-sm text-slate-800 dark:text-zinc-200'>{message}</p>
      </div>
      </div>
    </div>
  );
};

export default Toast;