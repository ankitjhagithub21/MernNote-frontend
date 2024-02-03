// authSlice.js
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeTokenInLs: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token',state.token)
      state.isAuthenticated=true
    },
    setUser:(state,action)=>{
      state.user=action.payload
      state.isAuthenticated= !!state.user
      
    },
    logout:(state)=>{
      localStorage.removeItem('token')
      state.isAuthenticated=false
      state.user=null
    }
   
  },
});

export const { storeTokenInLs,setUser,logout} = authSlice.actions;

export default authSlice.reducer;
