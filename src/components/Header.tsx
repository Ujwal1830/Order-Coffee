'use client'

import { useCart } from '@/context/CartContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Header() {

  const { data, status } = useSession();
  const { cart } = useCart();

  return (
    <>
      <div className='flex items-center justify-center py-2 px-2 md:py-4 md:px-4'>
        <nav className='w-full flex items-center justify-around py-1 bg-orange-300/50 opacity-90 rounded-full mx-auto max-w-4xl *:text-amber-950 *:text-base md:*:text-xl *:font-bold'>
            <Link className='hover:bg-amber-950 hover:text-orange-300 px-5 md:px-10 py-2 rounded-full' href={'/'}>Home</Link>
            {!data?.user && <Link className='hover:bg-amber-950 hover:text-orange-300 px-5 md:px-10 py-2 rounded-full' href={'/signup'}>SignUp</Link>}
            {!data?.user && <Link className='hover:bg-amber-950 hover:text-orange-300 px-5 md:px-10 py-2 rounded-full' href={'/login'}>Login</Link>}
            {data?.user && <Link className='flex items-center group hover:relative hover:bg-amber-950 hover:text-orange-300  px-5 md:px-10 py-2 rounded-full gap-2' href={'/cart'}>
              <span>Cart</span>
              { 
                cart.length > 0 && <span className='group-hover:absolute text-xs bg-white px-2 py-1 rounded-full group-hover:-right-2 group-hover:-top-1 text-black'>{cart.length}</span>
              }
              </Link>}
            {data?.user && <Link className='hover:bg-amber-950 hover:text-orange-300  px-5 md:px-10 py-2 rounded-full' href={'/profile'}>Profile</Link>}
        </nav>
      </div>
      { status === 'unauthenticated' && <div className="flex justify-center">
        <div className="relative opacity-80 z-[-1] flex place-items-center before:absolute before:h-[200px] before:w-full before:-translate-x-1/4 before:rounded-md before:bg-gradient-conic before:from-white before:to-transparent before:blur-xl before:content-[''] after:absolute after:-z-5 after:h-[280px] after:w-full after:-translate-x-1 after:bg-gradient-radial after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#dca66d] before:dark:opacity-10 after:dark:from-[#482b0c] after:dark:via-[#854908] after:dark:opacity-20 sm:before:w-[500px] sm:after:w-full">
          <Image
            className="relative w-52 h-52 object-cover opacity-90 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/coffee.png"
            alt="Next.js Logo"
            width={290}
            height={290}
            priority
          />
        </div>
      </div>}
    </>
  )
}
