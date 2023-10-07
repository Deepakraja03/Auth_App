import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formdata, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:3000';
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formdata),
      }
      );
      const data = await res.json();
      setLoading(false);
      setError(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4'> 
        <input type="text" placeholder="Username" id="username" className = ' bg-slate-100 rounded-lg p-3' 
        onChange={handleChange} />
        <input type="email" placeholder="Email" id="email" className = ' bg-slate-100 rounded-lg p-3' 
        onChange={handleChange} />
        <input type="password" placeholder="Password" id="password" className = ' bg-slate-100 rounded-lg p-3' 
        onChange={handleChange} />
        <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading" : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className=' flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <Link to={'/sign-in'}>
          <span className=' text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className=' text-red-700 mt-5'>{error && "Something went wrong."}</p>
    </div>
  )
}
