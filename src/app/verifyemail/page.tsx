'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const VerifyEmailPage=()=> {

    const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=> {
        setToken(window.location.search.split("=")[1] || "")
    }, []);
    useEffect(()=> {
        if( token.length > 0 ) {
            verifyUserEmail();
        }
    }, [token])

    const verifyUserEmail = async() => {
        try {
            await axios.post(`/api/users/verifyemail`, {token});
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      VerifyEmailPage
      {token ? (
        <div className='mt-6'>
            <h2 className='bg-green-500'>{token}</h2>
        </div>
      ) : (
          <div className='mt-6 bg-red-500'>
            <h2>No Token</h2>
        </div>
      )}
      <div className='mt-6'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link href={"/login"} >Login</Link>
        </button>
      </div>

    </div>
  )
}
export default VerifyEmailPage;