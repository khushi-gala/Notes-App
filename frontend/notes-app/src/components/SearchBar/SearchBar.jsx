import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value, onChange, handleSearch, onClearSearch }) => {
  const onKeyPress=(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className='w-80 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl flex items-center px-4 bg-lightpurple  dark:bg-stone-900 dark:hover:bg-stone-700 hover:border-2 hover:border-black dark:hover:border-blue-900 rounded-md hover:scale-95 transition-all ease-in-out'>
  <FaMagnifyingGlass 
    className="dark:text-zinc-200 cursor-pointer dark:hover:text-gray-200" 
    onClick={handleSearch}
  />
  <input
    type='text'
    placeholder='Search Notes'
    className='w-full text-xs sm:text-sm bg-transparent py-[11px] sm:px-3 sm:py-[11px] outline-none dark:text-zinc-200 placeholder:text-neutral-800 dark:placeholder:text-zinc-200'
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
  {value && (
    <IoMdClose 
      className="text-xl sm:text-xl dark:text-zinc-200 cursor-pointer dark:hover:text-gray-200 mr-3" 
      onClick={onClearSearch} 
    />
  )}
  
</div>

  )
}

export default SearchBar