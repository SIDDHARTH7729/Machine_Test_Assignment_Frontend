"use client"
import Sidebar from '@/components/Sidebar'
import React from 'react'
import FileUpload from './_Components/FileUploadComponent'
import FileUploadWelcome from './_Components/FileUploadWelcome'
import DistributedData from './_Components/DistributedData'
import { motion } from 'framer-motion'
export interface UploadFileProps {
  FirstName: string,
  Phone: string,
  Notes: string,
  agentId: string,
  sameId: string,
  agentName: string,
  agentEmail: string,
  createdAt: Date,
}

const uploadFile = () => {

  const [result, setResult] = React.useState<UploadFileProps[]>([]);
  const addResult = (newResult: UploadFileProps) => {
    setResult(prevResults => [...prevResults, newResult]);
  }
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
        <div>
          <FileUploadWelcome />
          <div className='-mt-16'>
            {result.length === 0 && (
              <FileUpload setResult={addResult} />
            )}
          </div>
          <div className='max-w-6xl'>
            {result.length > 0 && (
              <DistributedData data={result} />
            )}
          </div>
        </div>
      </main>
    </motion.div>
  )
}

export default uploadFile