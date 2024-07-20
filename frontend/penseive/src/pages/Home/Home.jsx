import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/cards/NoteCard/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
// import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosinstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/add-notes.svg';
import NoData from '../../assets/images/no-data.svg';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  })

  const [allNotes, setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit"})
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  }

  // Get User Info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    }
    catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      // console.log('1')
      const response = await axiosInstance.get("/get-all-notes");
      // console.log('2')
      if (response.data && response.data.notes) {
        // console.log('3')
        setAllNotes(response.data.notes);
        // console.log('4')
      }
    }
    
    catch (error) {
      console.log("An unexpected error occurred. Please try again.")
    };
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
        try{
            const response = await axiosInstance.delete(`/delete-note/${noteId}`);
            // console.log("hey");
            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", 'delete')
                // console.log("above");
                getAllNotes();
            }
        }
        catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message 
            ) {
              console.log("An unexpected error occurred. Please try again.")
            }
        }

  }

  // Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }
    catch (error){
      console.log(error);
    }
  };

  // Pin a Note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id
        try{
            const response = await axiosInstance.put(`/update-note-pin/${noteId}`, {
               isPinned: !noteData.isPinned,
            });
            if (response.data && response.data.note) {
                showToastMessage("Note Pinned Successfully")
                getAllNotes();
            }
        }
        catch (error) {
            console.log(error);
        }
  }
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);
  return (
    <div className='min-h-screen dark:bg-black bg-white'>
    <Navbar 
  userInfo={userInfo} 
  onSearchNote={onSearchNote} 
  handleClearSearch={handleClearSearch}
/>
<div className=" container mx-auto pt-5 pb-5 md:pt-16 flex-grow">
  {allNotes.length > 0 ? (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-5 mt-0 mx-6 sm:mx-4 md:mx-7'>
      {allNotes.map((item, index) => (
        <NoteCard 
          key={item._id}
          title={item.title}
          date={item.createdOn}
          content={item.content}
          tags={item.tags}
          tasks={item.tasks}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => deleteNote(item)}
          onPinNote={() => updateIsPinned(item)}
        />
      ))}
    </div>
  ) : (
    <EmptyCard 
      imgSrc={isSearch ? NoData : AddNotesImg} 
      message={isSearch ? 
        `Oops! No notes found matching your search.` : 
        `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
      }
    />
  )}
</div>
<button 
  className='w-16 h-16 flex items-center justify-center rounded-2xl bg-cpurple dark:bg-blue-900 fixed right-5 bottom-6 p-2 hover:scale-90 transition-all ease-in-out shadow-xl z-50' 
  onClick={() => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null});
  }}>
  <MdAdd className='text-[32px] text-zinc-300' />
</button>
<Modal
  isOpen={openAddEditModal.isShown}
  onRequestClose={() => {}}
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
      backdropFilter: 'blur(3px)'
    },
  }}
  contentLabel=""
  className="w-[90%] sm:w-[80%] md:w-[40%] max-h-[80%] bg-lightpurple border-black dark:bg-stone-800 border-2 dark:border-none rounded-md mx-auto mt-10 p-5 overflow-y-scroll 2xl:overflow-y-hidden overscroll-contain focus:overscroll-contain"
>
  <AddEditNotes 
    type={openAddEditModal.type}
    noteData={openAddEditModal.data}
    onClose={() => {
      setOpenAddEditModal({ isShown: false, type: "add", data: null });
    }}
    getAllNotes={getAllNotes}
    showToastMessage={showToastMessage}
  />
</Modal>
<Toast
  isShown={showToastMsg.isShown}
  message={showToastMsg.message}
  type={showToastMsg.type}
  onClose={handleCloseToast}
/>
</div>

  )
}

export default Home