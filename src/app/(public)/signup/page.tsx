import Navbar from '@/components/NavBar'
import { ProfileForm } from '@/app/(public)/signup/_Components/SignUp'
import React from 'react'

type Props = {}

const SignUp = (props: Props) => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col justify-center items-center h-screen'>
        <ProfileForm/>
        </div>
    </div>
  )
}

export default SignUp