import axios from 'axios';
import React, { useState } from 'react'
import {MdAdd, MdClose} from 'react-icons/md'
import axiosInstance from '../../../utils/axiosinstance';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
// import axiosnstance from 'frontend/notes-app/utils/axiosinstance.js'

const Todo = ({tasks, setTasks, noteId }) => {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const addNewTask = async () => {
        if (inputValue.trim() !== "") {
          try {
            // console.log('Sending request to:', `/notes/${noteId}/add-task`);
            // console.log('Request body:', { tasks: [{ task: inputValue.trim() }] });
            // console.log(noteId);
            const response = await axiosInstance.post(`/notes/${noteId}/add-task`, { tasks: [{ task: inputValue.trim() }] });
            // console.log('Task added successfully:', response.data);
            // console.log('Response:', response.data);
      
            setTasks(response.data.tasks);
            setInputValue("");
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      };
      
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTask();
        }
    }
    const handleRemoveTask = (taskToRemove) => {
        setTasks(tasks.filter((task) => task!== taskToRemove));
    }
  return (
    <div>
        
        <div className='flex items-center gap-4 mt-3 '>
            <input type='text' 
            value={inputValue}
            className='outline-none bg-lightpurple dark:bg-neutral-900 dark:border-gray-300 mr-0 rounded flex-grow p-2 dark:text-zinc-200 mt-0 placeholder:text-zinc-200' 
            placeholder='Add Tasks' 
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />
            <button className='w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded bg-lightpurple dark:bg-blue-900 hover:scale-125 transition-all ease-in-out'
            onClick={() => {
                addNewTask();
            }}
            > 
                <MdAdd className="text-3xl ml-1 content-center items-center text-zinc-200 dark:text-gray-300 dark:hover:text-white" />
            </button>
        </div>

        {tasks?.length >0 && (
            <div>
            {/* <div className='flex items-center gap-2 flex-wrap mt-2 text-gray-300'> */}
                {tasks.map((task, index) => (
                    <div key={index} className=' relative flex items-center gap-2 mt-2 w-52 text-sm bg-lightpurple text-zinc-200 dark:text-gray-300 dark:hover:bg-stone-700 dark:hover:text-zinc-200 dark:bg-neutral-900 px-3 py-1 rounded'>
                         {task.task}
                        <BsFillTrashFill className='cursor-pointer ml-2 mt-1 mr-2 absolute right-0 text-zinc-200' 
                        onClick={() => {
                            handleRemoveTask(task)
                            }}/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Todo