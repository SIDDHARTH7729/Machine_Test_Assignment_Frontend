"use client"
import React from 'react'
import CreateAgentForm from './_Components/createAgentForm'
import Sidebar from '@/components/Sidebar'
import WelcomeSection from './_Components/WelcomeSection'
import { motion } from 'framer-motion'

type Props = {}

const AgentCreation = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className='flex'>
      <div className='w-64 fixed'>
        <Sidebar />
      </div>
      <main className='flex-1 flex flex-col mt-16 bg-gray-50 justify-center items-center'>
        <WelcomeSection />
        <CreateAgentForm />
      </main>
    </motion.div>
  )
}

export default AgentCreation