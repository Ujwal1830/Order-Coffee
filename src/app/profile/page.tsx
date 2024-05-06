'use client'

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProfilePage() {

    const router = useRouter();
    const { data, status } = useSession();
    console.log("Inside Profile Page :: ",data);
    

  return (
    <div className="flex items-center justify-center flex-col">
        <div className='max-w-md sm:max-w-xl mx-auto p-6 bg-white shadow-md rounded-md'>
            <h1 className='my-1 text-2xl text-slate-500'>ProfilePage</h1>
            <hr />
            <h1 className='my-3 flex flex-row justify-between items-end'>
                <span className='text-slate-500 text-lg'>Username:</span>
                <span className='text-xl md:text-4xl text-purple-400'>{data?.user?.username}</span>
            </h1>
            <hr />
            <h1 className='my-3 flex flex-row justify-between items-end gap-6 md:gap-16'>
                <span className='text-slate-500 text-lg'>Email:</span>
                <span className='text-base sm:text-lg md:text-2xl text-purple-400'>{data?.user?.email}</span>
            </h1>
            <hr />
            <button onClick={()=>signOut({callbackUrl: '/login'})} className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Logout
            </button>
        </div>
    </div>
  )
}
