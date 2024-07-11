import React, { useState } from 'react'
import {MdAdd, MdClose} from 'react-icons/md'
const TagInput = ({tags, setTags}) => {

    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag!== tagToRemove));
    }
  return (
    <div>
        {tags?.length >0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2  dark:text-gray-300'>
                {tags.map((tag, index) => (
                    <span key={index} className='flex items-center gap-2 text-xs sm:text-sm bg-lightpurple text-zinc-200 dark:text-gray-300 dark:hover:bg-stone-700 dark:bg-neutral-900 px-3 py-1 rounded'>
                        # {tag}
                        <button onClick={() => {
                            handleRemoveTag(tag)
                            }}>
                            <MdClose className='hover:hover:scale-125 transition-all ease-in-out'/>
                        </button>
                    </span>
                ))}
            </div>
        )}
        <div className='flex items-center sm:gap-4 gap-4 mt-3 '>
            <input type='text' 
            value={inputValue}
            className='text-sm bg-lightpurple placeholder:text-zinc-200 sm:px-3 sm:py-2  dark:bg-neutral-900 dark:text-gray-300 px-3 py-2 rounded outline-none w-[88%] sm:w-[40%]' 
            placeholder='Add Tags'  
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />
            <button className='w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded bg-lightpurple text-zinc-200 dark:bg-blue-900 hover:scale-125 transition-all ease-in-out'
            onClick={() => {
                addNewTag();
            }}
            >
                <MdAdd className="text-3xl ml-1 items-center dark:text-gray-300 dark:hover:text-white" />
            </button>
        </div>
    </div>
  )
}

export default TagInput
