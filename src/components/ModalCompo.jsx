import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setNotes } from '../slices/noteSlice';
const ModalCompo = ({note,modalIsOpen,closeModal}) => {
    Modal.setAppElement('#root');
    const apiKey = import.meta.env.VITE_API_KEY
    const dispatch = useDispatch()
    const [savedNote,setSavedNote] = useState(note)
    const token = useSelector((state)=>state.auth.token)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(`${apiKey}api/note/update/${savedNote._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: savedNote.title,
              desc: savedNote.desc,
            }),
          });
      
          const data = await response.json();
      
          if (data.success) {
           toast.success(data.message);
           dispatch(setNotes(data.notes))
           closeModal()
           
            
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error during update:", error.message);
         toast.error("Note not updated")
        }
      };

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setSavedNote({
            ...savedNote,
            [name]:value
        }) 
    }
    return (
        <Modal isOpen={modalIsOpen} style={customStyles} >
            <button onClick={closeModal} className="absolute right-2 top-2">
                X
            </button>
            <h1 className="sm:text-3xl text-2xl text-center font-bold title-font mb-4 text-gray-900">
                Edit Note
            </h1>
            <form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
                <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">
                            Edit Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            value={savedNote.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label
                            htmlFor="desc"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Edit Description
                        </label>
                        <textarea
                            id="desc"
                            name="desc"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            value={savedNote.desc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        Save Changes
                    </button>
                </div>

            </form>
        </Modal>
    )
}

export default ModalCompo