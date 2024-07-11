import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ( {userInfo, onSearchNote, handleClearSearch } ) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
  }
  const handleSearch = () => {
    console.log("Search query:", searchQuery);
    if (searchQuery){
      onSearchNote(searchQuery)
    }
  }
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }
  return (
    <div className="dark:bg-stone-800  bg-cpurple  items-center justify-between px-6 py-2 shadow-md shadow-gray-400 dark:shadow-none  grid grid-cols-1  dark:border-none sm:justify-start col-span-1 sm:col-span-1 sm:h-24 sm:grid-cols-3 h-fit max-w-screen">
  <div className='col-span-1 flex justify-center sm:justify-start'>
  <h2 className="text-2xl font-semibold text-white dark:text-zinc-200 py-2 text-center my-1 sm:mt-0">Pensieve</h2>
  </div>
  <div className="col-span-1 flex justify-center">
  <SearchBar 
    value={searchQuery}
    onChange={({ target }) => setSearchQuery(target.value)}
    handleSearch={handleSearch}
    onClearSearch={onClearSearch}
  />
  </div>
  <div className="col-span-1 flex justify-center mt-2 sm:mt-0 sm:justify-end">
  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
  </div>
</div>

  )
}

export default Navbar