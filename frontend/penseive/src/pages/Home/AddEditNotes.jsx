import React, { useEffect, useState, useRef } from 'react';
import TagInput from '../../components/input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../../utils/axiosinstance';
import Todo from '../../components/Todo/Todo';
import 'quill/dist/quill.snow.css'; // Quill CSS
import Quill from 'quill'; // Quill JS

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [tasks, setTasks] = useState(noteData?.tasks || []);
  const [error, setError] = useState(null);
  const [noteId, setNoteId] = useState(noteData?._id || '');
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags,
        tasks,
      });
      if (response.data && response.data.note) {
        showToastMessage('Note Added Successfully');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later');
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
        tasks,
      });
      if (response.data && response.data.note) {
        showToastMessage('Note Updated Successfully');
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later');
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter the title.');
      return;
    }
    if (!content) {
      setError('Please enter the content.');
      return;
    }
    setError('');

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (quillRef.current) return; // Prevent re-initialization

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow', // 'snow' for rich text toolbar
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block'],
          ['bold', 'italic', 'underline'],
          [{ color: [] }, { align: [] }],
        ],
      },
    });

    if (quillRef.current) {
      quillRef.current.root.innerHTML = content;
      const toolbar = quillRef.current.getModule('toolbar');
      toolbar.container.classList.add(
        'space-x-2', 'bg-zinc-200', 'p-2', 'rounded', 'shadow-sm',
        'text-sm', 'text-slate-950', 'dark:bg-neutral-900', 'dark:text-zinc-200', 'dark:border-neutral-600', 'border-none'
      );
      toolbar.container.style.border = 'none';

      quillRef.current.on('text-change', () => {
        setContent(quillRef.current.root.innerHTML); // update content state on text change
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change');
      }
    };
  }, [content]); // Make sure the useEffect only runs once

  return (
    <div className='relative p-3'>
      <button className='items-center justify-center absolute -top-3 -right-3 dark:hover:text-zinc-200' onClick={onClose}>
        <MdClose className='text-2xl dark:text-zinc-200 items-center mx-1 dark:hover:text-white hover:scale-150 transition-all ease-in-out' />
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label text-lg font-medium sm:text-sm md:text-base lg:text-lg dark:text-zinc-400 text-neutral-900'>TITLE</label>
        <input
          type='text'
          className='text-2xl sm:text-xl md:text-2xl lg:text-2xl bg-zinc-200 text-neutral-900 pt-1 pb-1 dark:bg-neutral-900 rounded dark:text-zinc-300 px-2'
          placeholder='Add your Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label font-medium text-xs sm:text-sm md:text-base lg:text-lg text-neutral-900 dark:text-zinc-400'>CONTENT</label>
        <div
          id='editor'
          ref={editorRef}
          className='text-sm text-neutral-900 bg-zinc-200 rounded p-2 dark:bg-neutral-900 dark:text-zinc-300'
          style={{ minHeight: '300px', borderStyle: 'none' }}
        ></div>
      </div>
      <div className='mt-3'>
        <label className='input-label text-xs font-medium sm:text-sm md:text-base lg:text-lg text-neutral-900 dark:text-zinc-400'>TO DO LIST</label>
        <Todo tasks={tasks} setTasks={setTasks} noteId={noteId} />
      </div>
      <div className='mt-3'>
        <label className='input-label text-xs font-medium sm:text-sm md:text-base lg:text-lg text-neutral-900 dark:text-zinc-400'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-xs pt-4 sm:text-sm md:text-base lg:text-lg'>{error}</p>}

      <button
        className='btn-primary bg-cpurple text-zinc-200 text-lg dark:bg-blue-900 font-medium mt-5 p-3 sm:p-3 md:p-4 hover:scale-95 transition-all ease-in-out dark:text-zinc-300 dark:hover:text-zinc-200'
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' : 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
