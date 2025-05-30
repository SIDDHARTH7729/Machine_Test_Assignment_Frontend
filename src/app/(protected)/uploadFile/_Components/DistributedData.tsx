"use client"
import React, { useState } from 'react'
import { User, Phone, Calendar, FileText } from 'lucide-react'
import { UploadFileProps } from '../page'
import { motion } from 'framer-motion'

interface DistributedDataProps {
  data: UploadFileProps[]
}

const  containerAnimation = {
  hidden: {},
  show:{
    transition:{
      staggerChildren: 0.15,
    }
  }
}

const cardAnimation = {
  hidden:{opacity:0,y:30},
  show:  {opacity:1,y:0}
}

const itemAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};


const DistributedData: React.FC<DistributedDataProps> = ({ data }) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  console.log("The distributeddata at here is ", data)


  const groupByAgent = (data: UploadFileProps[]) => {
    return data.reduce((accumulator, item) => {
      const key = item.agentId
      if (!accumulator[key]) {
        accumulator[key] = {
          agentName: item.agentName,
          agentEmail: item.agentEmail,
          works: []
        }
      }
      accumulator[key].works.push(item)
      return accumulator
    }, {} as Record<string, { agentName: string, agentEmail: string, works: UploadFileProps[] }>)
  }

  const flatData = Array.isArray(data[0]) ? data[0] : data
  const groupedData = groupByAgent(flatData)

  return (
    <div className="bg-white min-h-screen p-6">
      <motion.div
        variants={containerAnimation}
        whileHover={{ scale: 1.02 }}
        transition={{type:'spring', stiffness: 300}}
       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedData).map(([agentId, agentData]) => (
          <motion.div
            variants={cardAnimation}
            whileHover={{ scale: 1.02 }}
            transition={{ type:'spring', stiffness:100 }}
           key={agentId} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 rounded-full p-2.5">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{agentData.agentName}</h3>
                <p className="text-slate-400 text-sm truncate">{agentData.agentEmail}</p>
              </div>
            </div>

            <div className="space-y-4">
              {agentData.works.map((work, index) => (
                <motion.div
                 variants={itemAnimation}
                 key={index} className="bg-slate-700 rounded-xl p-4 border border-slate-600">
                  <div className="text-white font-medium mb-3 text-lg">{work.FirstName}</div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{work.Phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">
                        {new Date(work.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {work.Notes && (
                      <div className="flex items-start gap-2 mt-3 pt-3 border-t border-slate-600">
                        <FileText className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm leading-relaxed">{work.Notes}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            
            <div className="mt-4 pt-4 border-t border-slate-700">
              <span className="text-slate-400 text-sm">
                {agentData.works.length} {agentData.works.length === 1 ? 'record' : 'records'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default DistributedData