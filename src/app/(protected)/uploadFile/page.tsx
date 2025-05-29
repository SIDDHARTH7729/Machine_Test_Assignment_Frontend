import Sidebar from '@/components/Sidebar'
import React from 'react'
import FileUpload from './_Components/FileUploadComponent'
import FileUploadWelcome from './_Components/FileUploadWelcome'

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

   const [result,setResult] = React.useState<UploadFileProps[]>([]);

   const addResult = (newResult: UploadFileProps) => {
    setResult(prevResults => [...prevResults, newResult]);
   }
  return (
   <div className='flex'>
        <div className='w-64 fixed'>
            <Sidebar/>
        </div>
        <main className='flex-1 flex flex-col mt-16 bg-gray-50 justify-center items-center'>
           <div>
             <FileUploadWelcome/>
             <div className='-mt-16'>
                <FileUpload setResult={addResult}/>
             </div>
           </div>
        </main>
    </div>
  )
}

export default uploadFile