import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { setNotes } from '../slices/noteSlice'
import { useState } from 'react'
import ModalCompo from './ModalCompo'

const Note = ({ note }) => {
    const apiKey = import.meta.env.VITE_API_KEY
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token);
    const [modalIsOpen, setIsOpen] = useState(false);
    const removeNote = async (noteId) => {
        try {
            const response = await fetch(`${apiKey}api/note/delete/${noteId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message)
                dispatch(setNotes(data.notes))
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error('Error fetching user:', error.message);

        }
    }
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const convertTimestampToLocalDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };
    return (
        <div className="p-4 lg:w-1/4 md:w-1/2 w-full">
            <ModalCompo note={note} modalIsOpen={modalIsOpen} closeModal={closeModal} />
            <div className="border-2 border-gray-200 p-4 rounded-lg">
                <b className='border-b-2 pb-2'>{convertTimestampToLocalDateTime(note.createdAt)}</b>
                
                <h2 className="font-medium text-2xl mt-4">{note.title}</h2>
                <p className="leading-relaxed">{note.desc}</p>
                <div className='mt-3 flex items-center gap-3'>
                    <FaTrash size={17} onClick={() => removeNote(note._id)} className='text-red-500 cursor-pointer' />
                    <FaEdit size={20} className='text-indigo-500 cursor-pointer' onClick={openModal} />
                </div>

            </div>
        </div>
    )
}

export default Note