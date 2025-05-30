import Navbar from '@/components/NavBar'
import { SignInForm } from '@/app/(public)/signin/_Components/SignIn'
import React from 'react'

type Props = {}

const SignIn = (props: Props) => {
  return (
    <div>
        <Navbar/>
       <div className='flex flex-col justify-center items-center h-screen'>
        <SignInForm/>
       </div>
    </div>
  )
}

export default SignIn