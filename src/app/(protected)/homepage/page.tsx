import Sidebar from '@/components/Sidebar'
import React from 'react'
import AdminWelcome from './_Components/AdminWelcome'
import AllAgents from './_Components/AllAgents'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <div className='flex'>
        <div className='w-64 fixed'>
            <Sidebar/>
        </div>
        <main className='flex-1 flex flex-col mt-16 bg-gray-50'>
            <AdminWelcome/>
            <AllAgents/>
            {/* Add other components here as needed */}
        </main>
    </div>
  )
}

export default Homepage