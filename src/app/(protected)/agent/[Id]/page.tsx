"use client"
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useParams } from 'next/navigation'
import WorksSection from './_Components/WorksSection'

type Props = {}


const AgentWorks = (props: Props) => {

    const params = useParams();
    const agentId = params.Id

  return (
    <div className='flex'>
        <div className='w-64 fixed'>
            <Sidebar/>
        </div>
        <main className='flex-1 flex flex-col mt-16 bg-gray-50 justify-center items-center'>
            <WorksSection agentId={agentId as string}/>
        </main>
    </div>
  )
}

export default AgentWorks