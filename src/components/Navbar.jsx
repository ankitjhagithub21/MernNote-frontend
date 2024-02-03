
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout} from '../slices/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfull.")
    navigate('/login');

  };

  

  return (
    <header>
      <nav className='flex justify-center lg:justify-between items-center p-5 container mx-auto flex-wrap gap-5'>
        <div className='flex items-center gap-2'>
          <img src="/vite.svg" alt="logo" />
          <span className='font-medium text-xl'>Mern Note</span>
        </div>
        <ul className='flex gap-5 items-center'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-note">Add Note</NavLink>

          {isAuthenticated ? (
            <button onClick={handleLogout} className='px-3 py-2 bg-gray-100 rounded-md'>Logout</button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
