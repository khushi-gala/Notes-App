import React from 'react'
import moment from 'moment'
import {MdCreate, MdDelete, MdOutlinePushPin, MdPushPin} from 'react-icons/md';
const NoteCard = ({
  title,
  date, 
  content,
  tags,
  tasks,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="mx-4 my-4 relative rounded p-4 h-44 w-full sm:w-auto bg-lightpurple hover:border-black dark:bg-stone-900 dark:hover:bg-neutral-800 hover:scale-95 transition-all ease-in-out dark:hover:border-blue-900 hover:border-2"
    onDoubleClick={onEdit}
    >
  <div className="flex items-center justify-between">
    <div>
      <h6 className="text-sm font-medium dark:text-zinc-200">{title}</h6>
      <span className="text-xs dark:text-zinc-200">{moment(date).format('Do MMM YYYY')}</span>
    </div>
    <MdPushPin className={`icon-btn ${isPinned ? 'text-blue-900 hover:text-zinc-200 dark:text-sky-700' : 'text-zinc-200 hover:text-blue-900 dark:text-slate-300'}`} onClick={onPinNote} />
  </div>
  <p className="text-xs dark:text-zinc-200 truncate mt-2">{content?.slice(0, 60)}</p>
  
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2">
    
    <div className="text-xs truncate dark:text-zinc-200">
      {tasks.map((item, index) => <span key={index}>⚫{`#${item.task}`}</span>)}
    </div>
    
    <div className="text-xs truncate dark:text-zinc-200">
      {tags.map((item, index) => <span key={index}>{`#${item}`}</span>)}
    </div>
    
    <div className="flex gap-2 items-center mt-2 sm:mt-0">
      <MdCreate className="icon-btn text-green-800 hover:text-emerald-900 dark:hover:text-emerald-500" 
      onClick={onEdit} />
      <MdDelete className="icon-btn text-rose-900 hover:text-red-950 dark:hover:text-red-500" 
      onClick={onDelete} />
    </div>
  </div>
</div>

  )
}

export default NoteCard