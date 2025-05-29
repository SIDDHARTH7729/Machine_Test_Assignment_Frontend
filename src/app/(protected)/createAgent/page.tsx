"use client"
import React from 'react'
import CreateAgentForm from './_Components/createAgentForm'
import Sidebar from '@/components/Sidebar'
import WelcomeSection from './_Components/WelcomeSection'

type Props = {}

const AgentCreation = (props: Props) => {
  return (
    <div className='flex'>
        <div className='w-64 fixed'>
            <Sidebar/>
        </div>
        <main className='flex-1 flex flex-col mt-16 bg-gray-50 justify-center items-center'>
            <WelcomeSection/>
            <CreateAgentForm/>
        </main>
    </div>
  )
}

export default AgentCreation