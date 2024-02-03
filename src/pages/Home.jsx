import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from '../slices/noteSlice';
import Note from '../components/Note';

const Home = () => {
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_API_KEY
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);
  const notes = useSelector(state => state.note.notes)
  const [loading, setLoading] = useState(true);

  const fetchUserNotes = async (token) => {
    try {
      const response = await fetch(`${apiKey}api/note`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setNotes(data.notes))
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {

    if (isAuthenticated) {
      fetchUserNotes(token);
    }
  }, [isAuthenticated, user, token]);

 

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <div className='text-center text-2xl'>
          {
            isAuthenticated ? <p>Welcome {user.username}</p> : <p>Please login to view your notes</p>
          }

        </div>
        {isAuthenticated && !loading && (
          <div>
            <h2 className='text-2xl text-center my-5'>Your Notes</h2>

            <div className="container mx-auto">

              <div className="flex flex-wrap justify-center my-5">
                {notes.length > 0 ? (
                  notes.map((note) => (
                   <Note key={note._id} note={note}/>
                  ))
                ) : (
                  <p>No notes available</p>
                )}


              </div>
            </div>


          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
