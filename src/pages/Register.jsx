import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast"

const Register = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const apiKey = import.meta.env.VITE_API_KEY
  const [loading, setLoading] = useState(false)
  const initialData = {
    username: "",
    email: "",
    password: "",
  }
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const res = await fetch(`${apiKey}api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message)
      setFormData(initialData)
      setLoading(false)
      navigate("/login")
    } else {
      toast.error(data.message)
      setLoading(false)
    }


  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='container mx-auto'>
      <div className='lg:w-1/2 mx-auto w-full my-24 p-3'>
        <h2 className='mb-5 text-center text-3xl'>Register Page</h2>
        <p className='text-center mb-3 text-indigo-500'>{loading ? 'Loading...' : ''}</p>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <input type="text" name='username' placeholder='Enter Your Name' className='border-2 w-full rounded-xl py-2 px-3' value={formData.username} onChange={handleChange} required autoComplete='off' minLength="2"
            maxLength="20" />
          <input type="email" name='email' placeholder='Enter Your Email' className='border-2 w-full rounded-xl py-2 px-3' value={formData.email} onChange={handleChange} required autoComplete='off' />
          <input type="password" name='password' placeholder='Set Password' className='border-2 w-full rounded-xl py-2 px-3' value={formData.password} onChange={handleChange} required autoComplete='off' minlength="8" />
          <button className='px-3 py-2 bg-green-500 rounded-xl text-white font-bold'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register