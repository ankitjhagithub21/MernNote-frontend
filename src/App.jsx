
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slices/authSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddNote from './pages/AddNote';
import { Toaster } from 'react-hot-toast';
import "./App.css"
import Footer from './components/Footer';
const App = () => {
  const token = useSelector((state) => state.auth.token);
  const apiKey = import.meta.env.VITE_API_KEY
  const dispatch = useDispatch();

  const fetchUserFromServer = async (token) => {
    try {
     
      const response = await fetch(`${apiKey}api/auth/user`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUser(data.user));
      } 
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    fetchUserFromServer(token);
  }, []);

  return (
    <BrowserRouter>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-note" element={<AddNote />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
