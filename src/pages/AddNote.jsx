import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../slices/noteSlice';
import toast from "react-hot-toast"

const AddNote = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
  const initialNote = {
    title: "",
    desc: ""
  };

  const [note, setNote] = useState(initialNote);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      if (!isAuthenticated) {
        toast.error("Please log in first.");
       
        return;
      }
       setLoading(true)
      const res = await fetch(`${apiKey}api/note/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(addNote(data.note));
        toast.success("Note added successfully");
        setLoading(false) 
        setNote(initialNote);
        
      } else {
        // Handle failure, e.g., show an error message
        console.error(data.message);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  return (
    <section>
      <div className="container mx-auto my-24">
        <h2 className='text-3xl text-center mb-2'>Add Note</h2>
        <p className='text-center mb-3 text-indigo-500'>{loading ? 'Loading...' : ''}</p>
        <div className='lg:w-1/2 w-full p-3 mx-auto'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder='Enter Title'
              className='w-full border-2 px-3 py-2 rounded-xl'
              value={note.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="desc"
              rows="5"
              placeholder='Enter Description'
              className='mt-3 px-3 py-2 w-full rounded-xl border-2'
              value={note.desc}
              onChange={handleChange}
              required
            ></textarea>
            <button className='px-3 py-2 bg-green-500 w-full rounded-xl text-white font-bold text-xl'>Add</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNote;
