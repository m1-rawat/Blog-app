import React, { useState } from 'react'
import { auth } from '../Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import './Login.css'

import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();



    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);

        navigate('/blogs')

    }
    return (
        <>
  <div class="login-container">
                    <button class="login-button" onClick={signInWithGoogle}>
    <img src="https://static.vecteezy.com/system/resources/previews/012/871/371/original/google-search-icon-google-product-illustration-free-png.png" alt="Google Logo" class="google-logo" />
    Login with Google
  </button>


  </div>
        </>
    )
}

export default Login