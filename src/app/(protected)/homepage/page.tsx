"use client"
import Sidebar from '@/components/Sidebar'
import React from 'react'
import AdminWelcome from './_Components/AdminWelcome'
import AllAgents from './_Components/AllAgents'
import { motion } from 'framer-motion'
type Props = {}

const Homepage = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className='flex'>
      <div className='w-64 fixed'>
        <Sidebar />
      </div>
      <main className='flex-1 flex flex-col mt-16 bg-gray-50'>
        <AdminWelcome />
        <AllAgents />
        {/* Add other components here as needed */}
      </main>
    </motion.div>
  )
}

export default Homepage