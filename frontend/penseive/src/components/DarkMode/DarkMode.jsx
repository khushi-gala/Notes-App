import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { MdSunny } from 'react-icons/md';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve the stored dark mode value from localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => { 
    // Update the document's class and store the value in localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }, [darkMode]);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="fixed bottom-6 left-4 bg-cpurple dark:bg-neutral-700 text-gray-800 dark:text-neutral-300 p-2 rounded-full shadow-xl hover:scale-90 transition-all ease-in-out z-50"
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <MdSunny className=' text-zinc-300 h-9 w-9' />
      ) : (
        // <img src={MoonSVG} alt="Moon Icon" className="h-6 w-6" />
        <FaMoon className=' text-zinc-200 h-9 w-9' />
      )}
    </button>
  );
};

export default DarkMode;
