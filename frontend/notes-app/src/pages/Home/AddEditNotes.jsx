import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../../utils/axiosinstance';
import axios from 'axios';
import Todo from "../../components/Todo/Todo"
// import Create from '../../components/Todo/Create';

const AddEditNotes = ({noteData, type, getAllNotes, onClose, showToastMessage}) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [tasks, setTasks] = useState(noteData?.tasks || []);
    const [error, setError] = useState(null);
    const [noteId, setNoteId] = useState(noteData?._id || '');
    const [task, setTask] = useState(noteData?.tasks || "");

    // Add Note
    const addNewNote = async () => {
        try{
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
                tasks,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                // console.log("above");
                getAllNotes();
                // console.log("bet");
                onClose();
                // console.log("below");
            }
        }
        catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message 
            ) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occurred. Please try again later")
            }
        }
    };

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id
        try{
            const response = await axiosInstance.put(`/edit-note/${noteId}`, {
                title,
                content,
                tags,
                tasks,
            });
            console.log("hey");
            if (response.data && response.data.note) {
                showToastMessage("Note Updated Successfully")
                console.log("above");
                getAllNotes();
                console.log("bet");
                onClose();
                console.log("below");
            }
        }
        catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message 
            ) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occurred. Please try again later")
            }
        }
    };
    const handleAddNote = () => {
        if(!title) {
            setError("Please enter the title.");
            return;
        }
        if(!content) {
            setError("Please enter the content.");
            return;
        }
        setError("");
        
        if (type === 'edit'){
            editNote()
        }
        else{
            addNewNote()
        }
    };
    
  return (
    <div className='relative p-3'>
        <button className=' items-center justify-center absolute -top-3 -right-3 dark:hover:text-zinc-200' onClick={onClose}>
            <MdClose className='text-xl dark:text-zinc-200 items-center mx-2 dark:hover:text-white hover:scale-125 transition-all ease-in-out' />
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label text-lg sm:text-sm md:text-base lg:text-lg dark:text-zinc-200'>TITLE</label>
            <input
            type='text'
            className='text-2xl sm:text-xl md:text-2xl lg:text-2xl bg-cpurple text-zinc-200 pt-1 pb-1 dark:bg-neutral-900 rounded dark:text-zinc-200 px-2'
            placeholder='Add your Title'
            value={title}
            onChange={( {target} ) => setTitle(target.value)}
            />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label text-xs sm:text-sm md:text-base lg:text-lg dark:text-zinc-200'>CONTENT</label>
            <textarea
                type="text"
                className='text-xs sm:text-sm md:text-base lg:text-lg bg-cpurple text-zinc-200 dark:text-zinc-200 dark:bg-neutral-900 px-2 p-2 rounded'
                placeholder='Elaborate your note'
                rows={10}
                value={content}
            onChange={( {target} ) => setContent(target.value)}
            />
        </div>
        <div className='mt-3'>
        <label className='input-label text-xs sm:text-sm md:text-base lg:text-lg dark:text-zinc-200'>To Do List</label>
        <Todo tasks={tasks} setTasks={setTasks} noteId={noteId} />
        </div>
        <div className='mt-3'>
            <label className='input-label text-xs sm:text-sm md:text-base lg:text-lg dark:text-zinc-200'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-500 text-xs pt-4 sm:text-sm md:text-base lg:text-lg'>{error}</p>}

        <button className='btn-primary bg-cpurple text-zinc-200 text-lg dark:bg-blue-900 font-medium mt-5 p-3 sm:p-3 md:p-4 hover:scale-95 transition-all ease-in-out' 
        onClick={handleAddNote}
        >{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
    </div>
  )
}

export default AddEditNotes