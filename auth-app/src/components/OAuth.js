import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import app  from '../firebase';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch(`${baseUrl}/auth/google`, {
                method: 'POST',
                crossDomain: true,
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Could not login with Google", error);
        }
    }
  return (
    <button type='button' 
        onClick={handleGoogleClick} 
        className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
            Continue with Google
    </button>
  )
}
